/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

source ./setup-settings.sql

-- SET SESSION sql_require_primary_key = OFF;

-- set @g_demo_size = 1024*1024*1024*768;

-- drop user if exists 'ara'@'%';
-- create user 'ara'@'%' identified with mysql_native_password by 'kunqhtsadzmopeh';

-- ----- --

set @g_demo_size = 1024*1024*1024*8;

select @g_db_pwd;

drop user if exists 'ara'@'%';
set @v_sql = concat( 'create user ''ara''@''%'' identified by ''', @g_db_pwd, ''';');
prepare stmt from @v_sql;
execute stmt;
deallocate prepare stmt;

-- ---------- --

drop database if exists ara;
create database ara;

use ara;

source ./setup.sql

source ./setup-grant.sql

-- ----- --

set @v_ai_id = -1;

call ara.local_a_ais_insert( 'google-ai-search', 'Google AI Search', 'https://www.youtube.com/watch?v=_VYjOXjKne4', @v_ai_id ); select @v_ai_id;
call ara.local_a_ais_insert( 'bing-copilot-search', 'Bing Copilot Search', 'https://www.youtube.com/watch?v=IdLbBpc9qJI', @v_ai_id ); select @v_ai_id;
call ara.local_a_ais_insert( 'chatgpt', 'ChatGPT', 'https://www.youtube.com/watch?v=CLWUaumMEEM', @v_ai_id ); select @v_ai_id;

-- ----- --

set @v_user_id = -1;
set @v_name = '_';
set @v_email = '_';
set @v_phone = '_';
call ara.local_a_users_insert( 'admin', @g_admin_pwd, @v_name, @v_email, @v_phone, 1, 1, 0, 0, @v_user_id );

set @v_error = '_'; set @v_token = '_'; call ara.login( 'admin', @g_admin_pwd, @v_token, @v_error ); select @v_token, @v_error;
set @v_name = 'Demo A1';
set @v_email = 'demoa1@airespaker.com';
set @v_phone = '_';
call ara.create_user( @v_token, 'demoa1', @g_demo_pwd, @v_name, @v_email, @v_phone, 1, 0, 1, @g_demo_size, @v_user_id );
set @v_name = 'Demo A2';
set @v_email = 'demoa2@airespaker.com';
set @v_phone = '_';
call ara.create_user( @v_token, 'demoa2', @g_demo_pwd, @v_name, @v_email, @v_phone, 1, 0, 1, @g_demo_size, @v_user_id );
set @v_name = 'Demo A3';
set @v_email = 'demoa3@airespaker.com';
set @v_phone = '_';
call ara.create_user( @v_token, 'demoa3', @g_demo_pwd, @v_name, @v_email, @v_phone, 1, 0, 1, @g_demo_size, @v_user_id );
set @v_name = 'Demo B1';
set @v_email = 'demob1@airespaker.com';
set @v_phone = '_';
call ara.create_user( @v_token, 'demob1', @g_demo_pwd, @v_name, @v_email, @v_phone, 1, 0, 0, @g_demo_size, @v_user_id );
set @v_name = 'Demo B2';
set @v_email = 'demob2@airespaker.com';
set @v_phone = '_';
call ara.create_user( @v_token, 'demob2', @g_demo_pwd, @v_name, @v_email, @v_phone, 1, 0, 0, @g_demo_size, @v_user_id );
set @v_name = 'Demo B3';
set @v_email = 'demob3@airespaker.com';
set @v_phone = '_';
call ara.create_user( @v_token, 'demob3', @g_demo_pwd, @v_name, @v_email, @v_phone, 1, 0, 0, @g_demo_size, @v_user_id );
call ara.logout( @v_token );
