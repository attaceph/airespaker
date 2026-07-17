/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop table if exists ara_users;
create table ara_users (
  id bigint not null auto_increment primary key,

  username varchar(1024) not null,
  password varchar(1024) not null,

  name varchar(1024) not null,
  email varchar(1024) not null,
  phone varchar(1024) not null,

  api_call int not null default 0,
  user_make int not null default 0,
  user_demo int not null default 0,

  quota bigint not null default 0,
  used bigint not null default 0,
  fulled int not null default 0,

  created timestamp not null default current_timestamp,
  updated timestamp not null default current_timestamp on update current_timestamp,
  constraint uc_ara_users unique(username)
) auto_increment = 1;

