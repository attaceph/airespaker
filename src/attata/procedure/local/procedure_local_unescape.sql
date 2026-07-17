/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_unescape;
delimiter $$
create procedure local_unescape( in p_input longtext, out p_output longtext )
sql security invoker
begin
  if p_input is NULL then
    set p_output = 'NULL';
  else
    set p_output = p_input;
  end if;
  set p_output = replace( p_output, '__sq__', '''' );
  set p_output = replace( p_output, '__dq__', '\"' );
  set p_output = replace( p_output, '__nl__', '\n' );
  set p_output = replace( p_output, '__cr__', '\r' );
  set p_output = replace( p_output, '__tb__', '\t' );
  set p_output = replace( p_output, '__td__', '`' );
  set p_output = replace( p_output, '__sl__', '\\' );
  set p_output = replace( p_output, '_._us_._', '_' );
end;$$
delimiter ;