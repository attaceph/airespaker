<?php
require_once __DIR__ . '/proxy.php';

function g_param( $key ) {
  if ( isset( $_POST[ $key ] ) ) return $_POST[ $key ];
  if ( isset( $_GET[ $key ] ) ) return $_GET[ $key ];
  return '';
}

$ready = true;
$text = g_text_get( g_param('uri'), $ready );
if ( g_param('cr') === 'y' && $ready === false ) $text = 'Site is off-line!'; 
header('Content-Type: text/plain');
echo $text;
?>
