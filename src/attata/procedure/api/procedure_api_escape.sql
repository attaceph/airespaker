/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists `escape`;
delimiter $$
create procedure `escape`( in p_input longtext, out p_output longtext )
sql security definer
begin
  call local_escape( p_input, p_output );
end;$$
delimiter ;