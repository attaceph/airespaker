/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop table if exists ara_sessions;
create table ara_sessions (
  id bigint not null auto_increment primary key,
  token varchar(36) not null,
  user_id bigint not null,
  created timestamp not null default current_timestamp,
  updated timestamp not null default current_timestamp on update current_timestamp,
  constraint uc_ara_sessions unique(token)
) auto_increment = 1;