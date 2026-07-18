/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists air_list;
delimiter $$
create procedure air_list( 
  in p_token varchar(36),
  in p_ai varchar(256),
  in p_tag varchar(4096),
  in p_code varchar(1024),
  in p_page_no bigint,
  in p_page_size bigint
)
sql security definer
begin
  declare v_is_online int default 0;
  declare v_right int default 0;
  declare v_count bigint default 0;
  declare v_ai_id bigint default 0;
  declare v_offset bigint;
  declare v_user_id bigint default 0;
  declare v_username varchar(1024);
  declare v_name varchar(1024);
  declare v_email varchar(1024);
  declare v_phone varchar(1024);

  if p_page_size <= 0 then
    set p_page_size = 20;
  end if;
  if p_code is null then
    set p_code = '';
  end if;

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'api_call', v_right );
    if v_right = 1 then
      if p_page_no <= 0 then
        set p_page_no = 1;
      end if;
      set v_offset = (p_page_no - 1) * p_page_size;
      call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );

      select count( `id` ) into v_count from `ara_ais` where `slug` = p_ai;
      if v_count = 1 then
        select `id` into v_ai_id from `ara_ais` where `slug` = p_ai;
        if p_code = '' then
          select r.`id`, local_escape_f( r.`query` ) as `query`, local_escape_f( r.`reply` ) as `reply`, a.slug as `ai_slug`, a.name as `ai_name`, local_escape_f(r.tags) as `tags`, r.code as `code` from `ara_responses` as r, `ara_ais` as a where r.`user_id` = v_user_id and r.`ai_id` = a.`id` and r.`ai_id` = v_ai_id order by r.`id` desc limit v_offset, p_page_size;
        else
          set p_code = concat( '%', p_code, '%' );
          select r.`id`, local_escape_f( r.`query` ) as `query`, local_escape_f( r.`reply` ) as `reply`, a.slug as `ai_slug`, a.name as `ai_name`, local_escape_f(r.tags) as `tags`, r.code as `code` from `ara_responses` as r, `ara_ais` as a where r.`user_id` = v_user_id and r.`ai_id` = a.`id` and r.`ai_id` = v_ai_id and ( (r.`code` like p_code) or (r.`query` like p_code) ) order by r.`id` desc limit v_offset, p_page_size;
        end if;
      else
        if p_tag is null then
          set p_tag = '';
        end if;
        if p_tag = '' then
          if p_code = '' then
            select r.`id`, local_escape_f( r.`query` ) as `query`, local_escape_f( r.`reply` ) as `reply`, a.slug as `ai_slug`, a.name as `ai_name`, local_escape_f(r.tags) as `tags`, r.code as `code` from `ara_responses` as r, `ara_ais` as a where r.`user_id` = v_user_id and r.`ai_id` = a.`id` order by r.`id` desc limit v_offset, p_page_size;
          else
            set p_code = concat( '%', p_code, '%' );
            select r.`id`, local_escape_f( r.`query` ) as `query`, local_escape_f( r.`reply` ) as `reply`, a.slug as `ai_slug`, a.name as `ai_name`, local_escape_f(r.tags) as `tags`, r.code as `code` from `ara_responses` as r, `ara_ais` as a where r.`user_id` = v_user_id and r.`ai_id` = a.`id` and ( (r.`code` like p_code) or (r.`query` like p_code) ) order by r.`id` desc limit v_offset, p_page_size;
          end if;
        else
          set p_tag = concat( ' , ', p_tag, ' , ' );
          if p_code = '' then
            select r.`id`, local_escape_f( r.`query` ) as `query`, local_escape_f( r.`reply` ) as `reply`, a.slug as `ai_slug`, a.name as `ai_name`, local_escape_f(r.tags) as `tags`, r.code as `code` from `ara_responses` as r, `ara_ais` as a where r.`user_id` = v_user_id and r.`ai_id` = a.`id` and instr(r.tags, p_tag) > 0 order by r.`id` desc limit v_offset, p_page_size;
          else
            set p_code = concat( '%', p_code, '%' );
            select r.`id`, local_escape_f( r.`query` ) as `query`, local_escape_f( r.`reply` ) as `reply`, a.slug as `ai_slug`, a.name as `ai_name`, local_escape_f(r.tags) as `tags`, r.code as `code` from `ara_responses` as r, `ara_ais` as a where r.`user_id` = v_user_id and r.`ai_id` = a.`id` and instr(r.tags, p_tag) > 0 and ( (r.`code` like p_code) or (r.`query` like p_code) ) order by r.`id` desc limit v_offset, p_page_size;
          end if;
        end if;
      end if;
    end if;
  end if;
end;$$
delimiter ;