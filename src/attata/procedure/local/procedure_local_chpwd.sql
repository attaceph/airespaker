/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_chpwd;
delimiter $$
create procedure local_chpwd( 
  in p_user_id bigint, in p_password varchar(4096)
)
sql security invoker
begin
  declare v_password varchar(4096);
  set v_password = sha2( p_password, 256 );
  update `ara_users` set `password` = v_password where `id` = p_user_id;
end;$$
delimiter ;