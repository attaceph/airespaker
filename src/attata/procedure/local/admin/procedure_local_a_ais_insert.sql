/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists local_a_ais_insert;
delimiter $$
create procedure local_a_ais_insert( 
  in p_slug varchar(256),
  in p_name varchar(1024),
  in p_guide_url varchar(1024),
  out p_ai_id bigint
)
sql security invoker
begin
  insert into `ara_ais` ( 
    `slug`,
    `name`,
    `guide_url`
  ) values ( 
    p_slug,
    p_name,
    p_guide_url
  );
  set p_ai_id = last_insert_id();
end;$$
delimiter ;