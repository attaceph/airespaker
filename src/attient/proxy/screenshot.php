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

$error = '';
$shot = g_screenshot( g_param('uri'), $error );
if ( $shot === false ) {
  header('Content-Type: text/plain');
  if ( $error === '' ) {
    echo 'Failed to take screenshot!';
  } else {
    echo $error;
  }
  exit();
}
header('Location: ' . $shot );
?>
