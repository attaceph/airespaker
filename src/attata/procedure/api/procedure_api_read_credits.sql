/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists read_credits;
delimiter $$
create procedure read_credits ( 
  in p_token varchar(36),
  out p_today varchar(256),
  out p_input_tokens bigint,
  out p_output_tokens bigint,
  out p_api_cost double,
  out p_cost double
)
sql security definer
begin
  declare v_is_online int default 0;
  declare v_right int default 0;
  declare v_count bigint default 0;
  declare v_user_id bigint default 0;
  declare v_username varchar(1024);
  declare v_name varchar(1024);
  declare v_email varchar(1024);
  declare v_phone varchar(1024);

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'api_call', v_right );
    if v_right = 1 then
      call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );

      select count( `id` ) into v_count from `ara_users` where `premium` <> 0 and `id` = v_user_id;
      if v_count = 1 then
        select
          `today`,
          `input_tokens`,
          `output_tokens`,
          `api_cost`,
          `cost`
        into
          p_today,
          p_input_tokens,
          p_output_tokens,
          p_api_cost,
          p_cost
        from ara_users where `id` = v_user_id;
      end if;
    end if;
  end if;
end;$$
delimiter ;