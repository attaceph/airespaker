/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists update_credits;
delimiter $$
create procedure update_credits ( 
  in p_token varchar(36),
  in p_input_tokens bigint,
  in p_output_tokens bigint,
  in p_api_cost double,
  in p_cost double
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
  declare v_today varchar(256);

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'api_call', v_right );
    if v_right = 1 then
      call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );

      select count( `id` ) into v_count from `ara_users` where `premium` <> 0 and `id` = v_user_id;
      if v_count = 1 then
        set v_today = date(current_timestamp);
        update ara_users set `today` = v_today, `input_tokens` = 0, `output_tokens` = 0, `api_cost` = 0, `cost` = 0 where `id` = v_user_id and `today` <> v_today;
        update ara_users set `input_tokens` = `input_tokens` + p_input_tokens, `output_tokens` = `output_tokens` + p_output_tokens, `api_cost` = `api_cost` + p_api_cost, `cost` = `cost` + p_cost where `id` = v_user_id;
      end if;
    end if;
  end if;
end;$$
delimiter ;