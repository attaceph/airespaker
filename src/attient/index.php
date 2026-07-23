<?php
/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */
 
global $g_config;
require_once __DIR__ . '/config.php';

$premium = $g_config['premium'];
if ( $g_config['prelaunch'] ) {
  $prelaunch = 'true';
} else {
  $prelaunch = 'false';
}
$aircache_default_query = $g_config['aircache_default_query'];
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
  <script src="/components/aircache_page.js"></script>
  <link rel="stylesheet" href="/components/aircache_page.css">
  <script src="/components/savecache_page.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/latex.js/dist/latex.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/1c.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/abnf.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/ada.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/armasm.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/powershell.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/actionscript.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/apache.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/applescript.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/arcade.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/asciidoc.min.js"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/aspectj.min.js"></script> 
  <script>
let gv_app = null;
let go_enable_prelaunch = <?php print( $prelaunch ); ?>;
let go_premium = '<?php print( $premium ); ?>';
let go_aircache_default_query = "<?php print( $aircache_default_query ); ?>";

function gj_rand_str( length ) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxya0123456789';
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

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
  let url = '/proxy/text_get.php?rand=' + gj_rand_str(16) + '&cr=' + cr + '&uri=' + encodeURIComponent(uri); 
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(3600000) });
    const text = await response.text();
    cb( text );
  } catch (error) {
    console.log('[Error] ' + error);
    cb( '' + error );
  }
}

async function gj_text_post( uri, data, cr, cb ) {
  let url = '/proxy/text_post.php?rand=' + gj_rand_str(16) + '&cr=' + cr + '&uri=' + encodeURIComponent(uri); 
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(3600000),
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
  v_app.component( 'aircache_page', AIRCachePage );
  v_app.component( 'savecache_page', SaveCachePage );
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
