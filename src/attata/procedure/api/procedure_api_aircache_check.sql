/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists aircache_check;
delimiter $$
create procedure aircache_check( 
  in p_username varchar(1024),
  in p_code varchar(1024),
  out p_find int
)
sql security definer
begin
  declare v_count bigint default 0;

  set p_find = 0;

  if p_code <> '' and p_code <> '_' and p_username <> '' then
    select count(r.`id`) into v_count from `ara_responses` as r, `ara_users` as u where r.`user_id` = u.`id` and u.`username` = p_username and r.`query` = p_code;
    if v_count > 0 then
      set p_find = 1;
    end if;
  end if;
end;$$
delimiter ;