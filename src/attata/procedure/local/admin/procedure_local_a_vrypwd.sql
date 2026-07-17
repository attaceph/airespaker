/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_a_vrypwd;
delimiter $$
create procedure local_a_vrypwd( 
  in p_user_id bigint, in p_password varchar(4096), out p_success int
)
sql security invoker
begin
  declare v_password varchar(4096);
  set v_password = sha2( p_password, 256 );
  select count(`id`) into p_success from `ara_users` where `id` = p_user_id and `password` = v_password;
end;$$
delimiter ;