/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists update_user;
delimiter $$
create procedure update_user(
  in p_token varchar(36), 
  in p_name varchar(1024),
  in p_email varchar(1024),
  in p_phone varchar(1024)
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

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'user_demo', v_right );
    if v_right = 0 then
      call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );
      update `ara_users` set `name` = p_name, `email` = p_email, `phone` = p_phone where `id` = v_user_id;
    end if;
  end if;
end;$$
delimiter ;