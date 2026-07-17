/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop table if exists ara_responses;
create table ara_responses (
  id bigint not null auto_increment primary key,

  user_id bigint not null,

  ai_id bigint not null,

  code varchar(36) not null,
  tags varchar(4096) not null,

  query longtext not null,
  reply longtext not null,

  created timestamp not null default current_timestamp,
  updated timestamp not null default current_timestamp on update current_timestamp,
  constraint uc_ara_responses unique(code)
) auto_increment = 1;

