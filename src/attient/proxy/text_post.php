<?php
/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

require_once __DIR__ . '/proxy.php';

function g_param( $key ) {
  if ( isset( $_POST[ $key ] ) ) return $_POST[ $key ];
  if ( isset( $_GET[ $key ] ) ) return $_GET[ $key ];
  return '';
}

function g_data() {
  $data = [];
  foreach ( $_POST as $key => $value ) {
    $data[$key] = $value;
  }
  return $data;
}

$ready = true;
$text = g_text_post( g_param('uri'), g_data(), $ready );
if ( g_param('cr') === 'y' && $ready === false ) $text = 'Site is off-line!'; 
header('Content-Type: text/plain');
echo $text;
?>
