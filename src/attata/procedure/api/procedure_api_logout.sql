/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists logout;
delimiter $$
create procedure logout( 
  in p_token varchar(36)
)
sql security definer
begin
  delete from `ara_sessions` where `token` = local_escape_f(p_token);
end;$$
delimiter ;