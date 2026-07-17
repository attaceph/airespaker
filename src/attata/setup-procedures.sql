/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

\. ./procedure/local/procedure_local_escape.sql
\. ./procedure/local/procedure_local_unescape.sql
\. ./procedure/local/procedure_local_chpwd.sql

\. ./procedure/local/admin/procedure_local_a_users_insert.sql
\. ./procedure/local/admin/procedure_local_a_users_read.sql
\. ./procedure/local/admin/procedure_local_a_users_sync.sql
\. ./procedure/local/admin/procedure_local_a_users_update.sql
\. ./procedure/local/admin/procedure_local_a_vrypwd.sql
\. ./procedure/local/admin/procedure_local_a_ais_insert.sql
