<!DOCTYPE html>
<html>
<head>
  <title>[airespaker] AI Response Taker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="/components/offline_page.js"></script>
  <link rel="stylesheet" href="/components/offline_page.css">
  <script src="/components/online_page.js"></script>
  <link rel="stylesheet" href="/components/online_page.css">
  <script>
let gv_app = null;

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
