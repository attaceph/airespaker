/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop function if exists local_unescape_f;
delimiter $$
create function local_unescape_f( p_input longtext )
returns longtext
deterministic
sql security invoker
begin
  declare v_output longtext;
  call local_unescape( p_input, v_output );
  return v_output;
end;$$
delimiter ;