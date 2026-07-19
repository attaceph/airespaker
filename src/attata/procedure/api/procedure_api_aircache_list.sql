/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists aircache_list;
delimiter $$
create procedure aircache_list( 
  in p_username varchar(1024),
  in p_code varchar(1024),
  in p_page_no bigint,
  in p_page_size bigint
)
sql security definer
begin
  declare v_offset bigint default 0;
  if p_code <> '' and p_username <> '' and p_code <> '_' then
    if p_page_no <= 0 then
      set p_page_no = 1;
    end if;
    set v_offset = (p_page_no - 1) * p_page_size;
    set p_code = concat( '%', p_code, '%' );
    select r.`id`, local_escape_f( r.`query` ) as `query`, local_escape_f( r.`reply` ) as `reply`, a.slug as `ai_slug`, a.name as `ai_name`, local_escape_f(r.tags) as `tags`, r.code as `code` from `ara_responses` as r, `ara_ais` as a, `ara_users` as u where r.`ai_id` = a.`id` and r.`user_id` = u.`id` and (u.`username` = p_username or u.`username` = 'airespaker') and r.`query` like p_code order by r.`user_id` desc, r.`id` desc limit v_offset, p_page_size;
  end if;
end;$$
delimiter ;