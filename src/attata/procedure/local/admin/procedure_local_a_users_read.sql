/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_a_users_read;
delimiter $$
create procedure local_a_users_read( 
  in p_user_id bigint,
  out p_username varchar(1024),
  out p_password varchar(4096),
  out p_company bigint,
  out p_api_call int,
  out p_user_make int,
  out p_user_demo int,
  out p_quota bigint,
  out p_used bigint,
  out p_fulled int
)
sql security invoker
begin
  declare v_username varchar(1024);
  select
    `username`,
    `password`,
    `company`,

    `api_call`,
    `user_make`,
    `user_demo`,

    `quota`,
    `used`,
    `fulled`
  into 
    v_username,
    p_password,
    p_company,

    p_api_call,
    p_user_make,
    p_user_demo,

    p_quota,
    p_used,
    p_fulled
  from `ara_users` where `id` = p_user_id;
  call local_unescape( v_username, p_username );
end;$$
delimiter ;