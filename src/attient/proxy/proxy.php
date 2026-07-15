<?php
/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

function g_text_get( $uri, &$ready ) {
  $host = @file_get_contents(__DIR__ . '/../host.txt');
  $ready = true;
  if ( $host === null ) {
    $ready = false;
  } else {
    $host = 'https://' . $host;
    $url = $host . "/ready.txt";
    $text = @file_get_contents( $url );
    if ( $text === null ) {
      $text = '';
    }
    $text = trim( $text );
    if ( $text === '' ) {
      $ready = false;  
    }
  }
  if ( ! $ready ) {
    $text = '';
  } else {
    $opts = [
      'http' => [
        'method' => 'GET',
        'header' => "X-Pinggy-No-Screen: yes\r\n"
      ]
    ];
    $context = stream_context_create( $opts );
    $url = $host . $uri;
    $text = @file_get_contents( $url, false, $context );
    if ( $text === null ) $text = '';
  }
  return $text;
}

?>
