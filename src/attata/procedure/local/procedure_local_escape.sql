/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_escape;
delimiter $$
create procedure local_escape( in p_input longtext, out p_output longtext )
sql security invoker
begin
  if p_input is NULL then
    set p_output = 'NULL';
  else
    set p_output = p_input;
  end if;
  set p_output = replace( p_output, '_', '_._us_._' );
  set p_output = replace( p_output, '''', '__sq__' );
  set p_output = replace( p_output, '\"', '__dq__' );
  set p_output = replace( p_output, '\n', '__nl__' );
  set p_output = replace( p_output, '\r', '__cr__' );
  set p_output = replace( p_output, '\t', '__tb__' );
  set p_output = replace( p_output, '`', '__td__' );
  set p_output = replace( p_output, '\\', '__sl__' );
end;$$
delimiter ;