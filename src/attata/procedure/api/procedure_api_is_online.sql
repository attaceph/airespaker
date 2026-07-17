/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists is_online;
delimiter $$
create procedure is_online( in p_token varchar(36), out p_online int )
sql security definer
begin
  declare v_count int default 0;

  select count(`id`) into v_count from `ara_sessions` where `token` = local_escape_f(p_token);
  if v_count <> 1 then
    set p_online = 0;
  else 
    set p_online = 1;
  end if; 
end;$$
delimiter ;
