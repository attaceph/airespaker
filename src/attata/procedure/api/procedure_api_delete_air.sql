/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists delete_air;
delimiter $$
create procedure delete_air(
  in p_token varchar(36), 
  in p_code varchar(36)
)
sql security definer
begin
  declare v_is_online int default 0;
  declare v_right int default 0;
  declare v_user_id bigint default 0;
  declare v_username varchar(4096);
  declare v_name varchar(1024);
  declare v_email varchar(1024);
  declare v_phone varchar(1024);

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'api_call', v_right );
    if v_right = 1 then
      call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );
      delete from `ara_responses` where `user_id` = v_user_id and `code` = p_code;
    end if;
  end if;
end;$$
delimiter ;