/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists save_air;
delimiter $$
create procedure save_air( 
  in p_token varchar(36),
  in p_ai varchar(256),
  in p_code varchar(36),
  in p_tags varchar(4096),
  in p_query longtext,
  in p_reply longtext,
  out p_air_id bigint
)
sql security definer
begin
  declare v_is_online int default 0;
  declare v_right int default 0;
  declare v_count bigint default 0;
  declare v_ai_id bigint default 0;
  declare v_user_id bigint default 0;
  declare v_username varchar(1024);
  declare v_name varchar(1024);
  declare v_email varchar(1024);
  declare v_phone varchar(1024);

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'api_call', v_right );
    if v_right = 1 then
      select count( `id` ) into v_count from `ara_ais` where `slug` = p_ai;
      if v_count = 1 then
        select `id` into v_ai_id from `ara_ais` where `slug` = p_ai;
        if p_query is null then
          set p_query = '_';
        end if;
        if p_reply is null then
          set p_reply = '_';
        end if;
        call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );
        insert into `ara_responses` ( `user_id`, `ai_id`, `code`, `tags`, `query`, `reply` ) values ( v_user_id, v_ai_id, p_code, p_tags, p_query, p_reply );
        set p_air_id = last_insert_id();
     end if;
    end if;
  end if;
end;$$
delimiter ;