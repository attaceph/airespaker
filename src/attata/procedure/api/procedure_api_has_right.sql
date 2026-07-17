/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists has_right;
delimiter $$
create procedure has_right( in p_token varchar(36), in p_right_code varchar(64), out p_right int )
sql security definer
begin
  declare v_count int default 0;
  declare v_user_id int;

  set p_right = 0;

  select count(`id`) into v_count from `ara_sessions` where `token` = local_escape_f(p_token);
  if v_count = 1 then
    select `user_id` into v_user_id from `ara_sessions` where `token` = local_escape_f(p_token) limit 1;

    if p_right_code = 'user_make' then
      select `user_make` into p_right from `ara_users` where `id` = v_user_id;
    end if;
    if p_right_code = 'user_demo' then
      select `user_demo` into p_right from `ara_users` where `id` = v_user_id;
    end if;
    if p_right_code = 'api_call' then
      select `api_call` into p_right from `ara_users` where `id` = v_user_id;
    end if;
    if p_right_code = 'storage_full' then
      select `used` >= `quota` into p_right from `ara_users` where `id` = v_user_id;
      update `ara_users` set `fulled` = p_right where `id` = v_user_id;
    end if;
  end if; 
end;$$
delimiter ;