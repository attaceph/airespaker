/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists user_rights;
delimiter $$
create procedure user_rights(
  in p_token varchar(36), 
  out p_api_call int,
  out p_user_make int,
  out p_user_demo int,
  out p_storage_full int
)
sql security definer
begin
  declare v_is_online int default 0;
  declare v_user_id int default 0;
  declare v_username varchar(1024);
  declare v_password varchar(4096);
  declare v_count int;
  declare v_quota bigint;
  declare v_used bigint;
  call is_online( p_token, v_is_online );
  if v_is_online then
    select count(`id`) into v_count from `ara_sessions` where `token` = local_escape_f( p_token );
    if v_count = 1 then
      select `user_id` into v_user_id from `ara_sessions` where `token` = local_escape_f( p_token );
      call local_a_users_read( 
        v_user_id, 

        v_username,
        v_password,

        p_api_call,
        p_user_make,
        p_user_demo,

        v_quota,
        v_used,
        p_storage_full
      );
    end if;
  end if;
end;$$
delimiter ;