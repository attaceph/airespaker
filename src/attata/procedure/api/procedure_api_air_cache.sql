/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists air_cache;
delimiter $$
create procedure air_cache( 
  in p_token varchar(36),
  in p_query varchar(4096),
  out p_reply longtext
)
sql security definer
begin
  declare v_is_online int default 0;
  declare v_right int default 0;
  declare v_count bigint default 0;
  declare v_user_id bigint default 0;
  declare v_username varchar(1024);
  declare v_name varchar(1024);
  declare v_email varchar(1024);
  declare v_phone varchar(1024);

  set p_reply = '_';

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'api_call', v_right );
    if v_right = 1 then
      call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );

      select count( `id` ) into v_count from `ara_responses` where `query` = p_query;
      if v_count = 1 then
        select local_escape_f( `reply` ) into p_reply from `ara_responses` where `query` = p_query;
      end if;
    end if;
  end if;
end;$$
delimiter ;