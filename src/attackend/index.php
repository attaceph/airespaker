<?php
global $g_config;
require_once __DIR__ . '/airespaker.php';

$method = g_param('method');

if ( $method === 'login' ) {
  $username = g_param('username');
  $password = g_param('password');
  $message = '';
  $token = g_login_common_user( $username, $password, $message );
  header('Content-Type: text/plain');
  if ( $token === false || $token === '_' ) {
    echo "Error: ", $message;
  } else {
    echo "Success: ", $token;
  }
} else if ( $method === 'take' ) {
  $token = g_param('token');
  $machine = g_param('machine');
  $query = g_param('query');
  $tags = g_param('tags');
  $result = g_take_air( $token, $query, $machine, $tags );
  header('Content-Type: text/plain');
  if ( $result === false ) {
    echo "Error: Failed to take AI repsonse!";
  } else {
    echo "Success: ", $result;
  }
} else if ( $method === 'ais_list' ) {
  $token = g_param('token');
  $result = g_ais_list( $token );
  header('Content-Type: text/plain');
  if ( $result === false ) {
    echo "Error: Failed to get AI list!";
  } else {
    echo "Success: ", $result;
  }
} else if ( $method === 'air_list' ) {
  $token = g_param('token');
  $ai = g_param('ai');
  $tag = g_param('tag');
  $code = g_param('code');
  $page_no = g_param('page_no');
  $page_size = g_param('page_size');
  $result = g_air_list( $token, $ai, $tag, $code, $page_no, $page_size );
  header('Content-Type: text/plain');
  if ( $result === false ) {
    echo "Error: Failed to get AIR list!";
  } else {
    echo "Success: ", $result;
  }
} else if ( $method === 'current_user' ) {
  $token = g_param('token');
  $result = g_current_user( $token );
  header('Content-Type: text/plain');
  if ( $result === false ) {
    echo "Error: Failed to get current user!";
  } else {
    echo "Success: ", $result;
  }
} else if ( $method === 'chpwd' ) {
  $token = g_param('token');
  $password = g_param('password');
  g_chpwd( $token, $password );
  header('Content-Type: text/plain');
  echo "Success: ";
} else if ( $method === 'all_tags' ) {
  $token = g_param('token');
  $result = g_all_tags( $token );
  header('Content-Type: text/plain');
  if ( $result === false ) {
    echo "Error: Failed to get all tags!";
  } else {
    echo "Success: ", implode( " , ", $result );
  }
} else if ( $method === 'register' ) {
  header('Content-Type: text/plain');
  $username = g_unescape(trim( g_param('username') ));
  $password = g_unescape(trim( g_param('password') ));
  $name = g_unescape(trim( g_param('name') ));
  $email = g_unescape(trim( g_param('email') ));
  $phone = g_unescape(trim( g_param('phone') ));


  $ready = true;
  if ( $ready ) {
    if ( $name === '' ) {
      echo "Error: Name is required!";
      $ready = false;
    }
  }
  if ( $ready ) {
    if ( $email === '' ) {
      echo "Error: Email is required!";
      $ready = false;
    }
    if ( $ready ) {
      if ( filter_var( $email, FILTER_VALIDATE_EMAIL) === false ) {
        echo "Error: Email is not valid!";
        $ready = false;
      }
    }
  }
  if ( $ready ) {
    $result = g_create_user( $username, $password, $name, $email, $phone );
    if ( $result === false ) {
      echo "Error: Failed to register!";
    } else {
      echo "Success: ";
    }
  }
} else if ( $method === 'update_user' ) {
  header('Content-Type: text/plain');
  $token = g_unescape(trim( g_param('token') ));
  $name = g_unescape(trim( g_param('name') ));
  $email = g_unescape(trim( g_param('email') ));
  $phone = g_unescape(trim( g_param('phone') ));

  $ready = true;
  if ( $ready ) {
    if ( $name === '' ) {
      echo "Error: Name is required!";
      $ready = false;
    }
  }
  if ( $ready ) {
    if ( $email === '' ) {
      echo "Error: Email is required!";
      $ready = false;
    }
    if ( $ready ) {
      if ( filter_var( $email, FILTER_VALIDATE_EMAIL) === false ) {
        echo "Error: Email is not valid!";
        $ready = false;
      }
    }
  }
  if ( $ready ) {
    g_update_user( $token, $name, $email, $phone );
    echo "Success: ";
  }
} else if ( $method === 'logout' ) {
  header('Content-Type: text/plain');
  $token = trim( g_param('token') );
  g_logout( $token );
  echo "Success: ";
} else if ( $method === 'delete_air' ) {
  header('Content-Type: text/plain');
  $token = trim( g_param('token') );
  $code = trim( g_param('code') );
  g_delete_air( $token, $code );
  echo "Success: ";
} else {
  header('Content-Type: text/plain');
  echo "Error: Method is not valid!";
}
?>