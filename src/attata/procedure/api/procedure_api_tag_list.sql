/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists tag_list;
delimiter $$
create procedure tag_list( 
  in p_token varchar(36),
  in p_page_no bigint,
  in p_page_size bigint
)
sql security definer
begin
  declare v_is_online int default 0;
  declare v_right int default 0;
  declare v_count bigint default 0;
  declare v_ai_id bigint default 0;
  declare v_offset bigint;
  declare v_user_id bigint default 0;
  declare v_username varchar(1024);
  declare v_name varchar(1024);
  declare v_email varchar(1024);
  declare v_phone varchar(1024);

  if p_page_size <= 0 then
    set p_page_size = 20;
  end if;

  call is_online( p_token, v_is_online );
  if v_is_online then
    call has_right( p_token, 'api_call', v_right );
    if v_right = 1 then
      call `current_user`( p_token, v_user_id, v_username, v_name, v_email, v_phone );
      if p_page_no <= 0 then
        set p_page_no = 1;
      end if;
      set v_offset = (p_page_no - 1) * p_page_size;
      select local_escape_f(tags) as `tags` from `ara_responses` where `user_id` = v_user_id order by `id` desc limit v_offset, p_page_size;
    end if;
  end if;
end;$$
delimiter ;