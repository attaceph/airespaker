/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists create_user;
delimiter $$
create procedure create_user(
  in p_token varchar(36), 
  in p_username varchar(1024),
  in p_password varchar(4096),
  in p_name varchar(1024),
  in p_email varchar(1024),
  in p_phone varchar(1024),
  in p_api_call int,
  in p_user_make int,
  in p_user_demo int,
  in p_quota bigint,
  out p_user_id bigint
)
sql security definer
begin
  declare v_is_online int default 0;
  declare v_right int default 0;
  declare v_user_id bigint default 0;
  declare v_username varchar(1024);
  declare v_name varchar(1024);
  declare v_email varchar(1024);
  declare v_phone varchar(1024);

  set p_user_id = -1;

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'user_make', v_right );
    if v_right then
      call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );
      call local_a_users_insert( p_username, p_password, p_name, p_email, p_phone, p_api_call, p_user_make, p_user_demo, p_quota, p_user_id );
    end if;
  end if;
end;$$
delimiter ;