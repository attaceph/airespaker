<?php
/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

set_time_limit(0);

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
        'header' => "X-Pinggy-No-Screen: yes\r\n",
        'timeout' => 3600
      ]
    ];
    $context = stream_context_create( $opts );
    $url = $host . $uri;
    $text = @file_get_contents( $url, false, $context );
    if ( $text === null ) $text = '';
  }
  return $text;
}

function g_text_post( $uri, $data, &$ready ) {
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
        'method' => 'POST',
        'header' => "X-Pinggy-No-Screen: yes\r\nContent-type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($data),
        'timeout' => 3600
      ]
    ];
    $context = stream_context_create( $opts );
    $url = $host . $uri;
    $text = @file_get_contents( $url, false, $context );
    if ( $text === null ) $text = '';
  }
  return $text;
}

function g_screenshot( $url, &$error ) {
  $width = 1280;
  $height = $width * 2;
  $url2 = "https://api.microlink.io?screenshot&viewport.width=" . $width . "&viewport.height=" . $height . "&waitForSelector=" . urlencode('.aircache-air-list-item-text') . "&url=" . urlencode( $url . '&uid=' . uniqid() );
  $opts = [
    'http' => [
      'method' => 'GET',
      'timeout' => 3600
    ]
  ];
  $context = stream_context_create( $opts );
  $text = @file_get_contents( $url2, false, $context );
  if ( $text === null ) {
    $error = 'Failed to get web page!';
    return false;
  }
  if ( strpos( $text, '{' ) !== false && strpos( $text, '}' ) !== false ) {
    $obj = json_decode( $text, true );
    if ( isset( $obj['status'] ) ) {
      if ( $obj['status'] === 'success' ) {
        if ( isset( $obj['data'] ) ) {
          if ( isset( $obj['data']['screenshot'] ) ) {
            if ( isset( $obj['data']['screenshot']['url'] ) ) {
              return $obj['data']['screenshot']['url'];
            } else {
              $error = 'Invalid results from screenshot capturer! ' . $text;
            }
          } else {
            $error = 'Invalid results from screenshot capturer! ' . $text;
          }
        } else {
          $error = 'Invalid results from screenshot capturer! ' . $text;      
        }
      } else {
        $error = 'Invalid results from screenshot capturer! ' . $text;
      }
    } else {
      $error = 'Invalid results from screenshot capturer! ' . $text;
    }
  } else {
    $error = 'Invalid results from screenshot capturer! ' . $text;
  }
  return false;
}
?>
