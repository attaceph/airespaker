<?php
/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */
?>
<!DOCTYPE html>
<html>
<head>
  <title>[airespaker] AI Response Taker</title>
  <link rel="icon" type="image/png" href="https://github.com/attaceph/airespaker/blob/main/brd/icon-96.png?raw=true">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="/components/md2html.js"></script>
  <link rel="stylesheet" href="/components/md2html.css">
  <script src="/components/offline_page.js"></script>
  <link rel="stylesheet" href="/components/offline_page.css">
  <script src="/components/online_page.js"></script>
  <link rel="stylesheet" href="/components/online_page.css">
  <script src="/components/login_page.js"></script>
  <link rel="stylesheet" href="/components/login_page.css">
  <script src="/components/dashboard_page.js"></script>
  <link rel="stylesheet" href="/components/dashboard_page.css">
  <script src="/components/take_page.js"></script>
  <link rel="stylesheet" href="/components/take_page.css">
  <script src="/components/profile_page.js"></script>
  <link rel="stylesheet" href="/components/profile_page.css">
  <script src="/components/register_page.js"></script>
  <link rel="stylesheet" href="/components/register_page.css">
  <script>
let gv_app = null;
let go_enable_prelaunch = true;

function gj_escape( sql ) {
  sql = sql.replaceAll( "_", "_._us_._" );
  sql = sql.replaceAll( "\n", "__nl__" );
  sql = sql.replaceAll( "\r", "__cr__" );
  sql = sql.replaceAll( "\t", "__tb__" );
  sql = sql.replaceAll( "\\", "__sl__" );
  sql = sql.replaceAll( '"', "__dq__" );
  sql = sql.replaceAll( "'", "__sq__" );
  sql = sql.replaceAll( "`", "__td__" );
  return sql;
}

function gj_unescape( sql ) {
  sql = sql.replaceAll( "__nl__", "\n" );
  sql = sql.replaceAll( "__cr__", "\r" );
  sql = sql.replaceAll( "__tb__", "\t" );
  sql = sql.replaceAll( "__sl__", "\\" );
  sql = sql.replaceAll( "__dq__", '"' );
  sql = sql.replaceAll( "__sq__", "'" );
  sql = sql.replaceAll( "__td__", "`" );
  sql = sql.replaceAll( "_._us_._", "_" );
  return sql;
}

async function gj_text_get( uri, cr, cb ) {
  let url = '/proxy/text_get.php?cr=' + cr + '&uri=' + encodeURIComponent(uri); 
  try {
    const response = await fetch(url);
    const text = await response.text();
    cb( text );
  } catch (error) {
    console.log('[Error] ' + error);
    cb( '' + error );
  }
}

async function gj_text_post( uri, data, cr, cb ) {
  let url = '/proxy/text_post.php?cr=' + cr + '&uri=' + encodeURIComponent(uri); 
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    const text = await response.text();
    cb( text );
  } catch (error) {
    console.log('[Error] ' + error);
    cb( '' + error );
  }
}

function gj_load() {
  const v_app = Vue.createApp({
    data() {
      return {
        online: false,
        message_php: "<?php print( $message ); ?>",
        message_jvs: "Click here to get message!"
      }
    },
    methods: {
      load() {
        this.$refs.offline_page.load();
      },
      update_online( value ) {
        this.online = value;
        this.$refs.online_page.update_online( value );
      },
      updateMessage() {
        let v_this = this;
        gj_text_get( '/', 'y', function( text ) {
          v_this.message_jvs = text;
        });
      }
    }  
  });
  v_app.component( 'offline_page', OfflinePage );
  v_app.component( 'login_page', LoginPage );
  v_app.component( 'take_page', TakePage );
  v_app.component( 'profile_page', ProfilePage );
  v_app.component( 'register_page', RegisterPage );
  v_app.component( 'dashboard_page', DashboardPage );
  v_app.component( 'online_page', OnlinePage );
  gv_app = v_app.mount('#ge_app');
  gv_app.load();
}
  </script>
  <style>
body {
  margin: 0px;
  padding: 0px;
}

#ge_app {
}
  </style>
</head>
<body id="ge_app" onload="gj_load()">
  <offline_page ref="offline_page" @update_online="update_online"></offline_page>
  <online_page ref="online_page"></online_page>
</body>
</html>
