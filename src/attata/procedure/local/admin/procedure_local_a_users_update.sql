/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_a_users_update;
delimiter $$
create procedure local_a_users_update( 
  in p_user_id bigint, 
  in p_api_call int,
  in p_user_make int,
  in p_user_demo int,
  in p_quota bigint,
  in p_used bigint,
  in p_fulled int
)
sql security invoker
begin
  update `ara_users` set 
    `api_call` = p_api_call,
    `user_make` = p_user_make,
    `user_demo` = p_user_demo,
    `quota` = p_quota,
    `used` = p_used,
    `fulled` = p_fulled
  where `id` = p_user_id;
end;$$
delimiter ;