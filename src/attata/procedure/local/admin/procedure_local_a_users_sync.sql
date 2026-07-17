/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_a_users_sync;
delimiter $$
create procedure local_a_users_sync( 
  in p_user_id bigint
)
sql security invoker
begin
  -- declare v_find varchar(8192);
  declare v_size bigint;
  declare v_right int;
  -- set v_find = concat( p_user_id, ' -:- %' );
  -- select sum(`total_size`) into v_size from `testor_suites` where local_unescape_f( `code` ) like v_find;
  set v_size = 0;
  update `ara_users` set `used` = v_size where `id` = p_user_id;
  select `used` >= `quota` into v_right from `ara_users` where `id` = p_user_id;
  update `ara_users` set `fulled` = v_right where `id` = p_user_id;
end;$$
delimiter ;