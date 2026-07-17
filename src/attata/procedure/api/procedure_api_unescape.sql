/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists `unescape`;
delimiter $$
create procedure `unescape`( in p_input longtext, out p_output longtext )
sql security definer
begin
  call local_unescape( p_input, p_output );
end;$$
delimiter ;