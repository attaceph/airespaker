/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_a_users_insert;
delimiter $$
create procedure local_a_users_insert( 
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
sql security invoker
begin
  declare v_username varchar(1024);
  declare v_password varchar(4096);
  call local_escape( p_username, v_username );
  set v_password = sha2( p_password, 256 );
  insert into `ara_users` ( 
    `username`,
    `password`,

    `name`,
    `email`,
    `phone`,

    `api_call`,
    `user_make`,
    `user_demo`,

    `quota`,
    `used`
  ) values ( 
    v_username, 
    v_password,

    p_name,
    p_email,
    p_phone,

    p_api_call,
    p_user_make,
    p_user_demo,

    p_quota,
    0
  );
  set p_user_id = last_insert_id();
end;$$
delimiter ;