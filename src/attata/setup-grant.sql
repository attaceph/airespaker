/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

-- grant select on ara.ara_welcome to 'ara'@'%';
-- grant usage on ara.ara_welcome to 'ara'@'%';
grant create temporary tables on ara.* to 'ara'@'%';

grant execute on procedure ara.login to 'ara'@'%';
grant execute on procedure ara.logout to 'ara'@'%';
grant execute on procedure ara.user_rights to 'ara'@'%';
grant execute on procedure ara.chpwd to 'ara'@'%';
grant execute on procedure ara.is_online to 'ara'@'%';
grant execute on procedure ara.has_right to 'ara'@'%';
grant execute on procedure ara.`escape` to 'ara'@'%';
grant execute on procedure ara.unescape to 'ara'@'%';
grant execute on procedure ara.ais_list to 'ara'@'%';
grant execute on procedure ara.save_air to 'ara'@'%';
grant execute on procedure ara.air_list to 'ara'@'%';
grant execute on procedure ara.tag_list to 'ara'@'%';
grant execute on procedure ara.`current_user` to 'ara'@'%';
grant execute on procedure ara.create_user to 'ara'@'%';
grant execute on procedure ara.update_user to 'ara'@'%';
