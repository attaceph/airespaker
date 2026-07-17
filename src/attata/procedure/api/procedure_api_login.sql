/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists login;
delimiter $$
create procedure login( 
  in p_username varchar(1024), in p_password varchar(4096), out p_token varchar(36), out p_error varchar(1024)
)
sql security definer
begin
  declare v_token varchar(36);
  declare v_success int default 0;
  declare v_count int default 0;
  declare v_user_id bigint;

  set v_token = concat( left(md5(rand() * 1000000000), 8), left(md5(rand() * 1000000000), 8), left(md5(rand() * 1000000000), 8), left(md5(rand() * 1000000000), 8) );

  select count(`id`) into v_count from `ara_users` where `username` = local_escape_f( p_username );

  if v_count <> 1 then
    set p_token = '_';
    set p_error = 'User is not found!';
  else 
    select `id` into v_user_id from `ara_users` where `username` = local_escape_f( p_username ) limit 1;
    call local_a_vrypwd( v_user_id, p_password, v_success );
    if v_success <> 1 then
      set p_token = '_';
      set p_error = 'Password does not match!';
    else 
      insert into `ara_sessions` ( `token`, `user_id` ) values ( local_escape_f(v_token), v_user_id );
      set p_token = v_token;
      set p_error = 'Login is success!';
    end if;
  end if; 
end;$$
delimiter ;