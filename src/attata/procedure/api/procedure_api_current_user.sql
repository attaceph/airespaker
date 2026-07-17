/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists `current_user`;
delimiter $$
create procedure `current_user`( 
  in p_token varchar(36), 
  out p_user_id bigint, 
  out p_username varchar(1024), 
  out p_name varchar(1024),
  out p_email varchar(1024),
  out p_phone varchar(1024)
)
sql security definer
begin
  declare v_count int default 0;
  declare v_is_online int default 0;
  call is_online( p_token, v_is_online );
  if v_is_online then
    select count(`id`) into v_count from `ara_sessions` where `token` = local_escape_f(p_token);
    if v_count = 1 then
      select `user_id` into p_user_id from `ara_sessions` where `token` = local_escape_f(p_token);
      select 
        local_unescape_f( `username` ),
        local_unescape_f(`name`),
        local_unescape_f(`email`),
        local_unescape_f(`phone`)
      into 
        p_username, 
        p_name,
        p_email,
        p_phone
      from `ara_users` 
      where `id` = p_user_id;
    else
      set p_user_id = -1;
      set p_username = '_';
      set p_name = '_';
      set p_email = '_';
      set p_phone = '_';
    end if;
  end if;
end;$$
delimiter ;