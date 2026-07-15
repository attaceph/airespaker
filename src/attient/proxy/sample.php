<?php
require_once __DIR__ . '/proxy.php';

$ready = true;
$message = g_text_get( '/', $ready );
if ( $ready === false ) $message = 'Site is off-line!';
?>
<!DOCTYPE html>
<html>
<head>
  <title>Proxy Sample -:- [airespaker] AI Response Taker</title>
  <style>
    #app {
      display: inline-block;
      padding: 10px;
      font-size: x-large;
      background-color: lightgreen;
    }
  </style>
</head>
<body>
<div id="app">
<h1>Proxy Sample</h1>
<p>Text (PHP): {{ message }}</p>
<p @click="updateMessage">Text (JavaScript): {{ message_b }}</p>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
async function g_text_get( uri, cr, cb ) {
  let url = '/proxy/text_get.php?cr=' + cr + '&uri=' + encodeURIComponent(uri); 
  try {
    const response = await fetch(url);
    const text = await response.text();
    cb( text );
  } catch (error) {
    cb( '' );
  }
}

const app = Vue.createApp({
  data() {
    return {
      message: "<?php print( $message ); ?>",
      message_b: "Click here to get message!"
    }
  },
  methods: {
    updateMessage() {
      let v_this = this;
      g_text_get( '/', 'y', function( text ) {
        v_this.message_b = text;
      });
    }
  }  
});
app.mount('#app');
</script>
</body>
</html>
