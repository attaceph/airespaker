<?php
global $g_config;
require_once __DIR__ . '/config.php';

set_time_limit(0);

function g_param( $key ) {
  if ( isset( $_POST[ $key ] ) ) return $_POST[ $key ];
  if ( isset( $_GET[ $key ] ) ) return $_GET[ $key ];
  return '';
}

function g_is_post() {
  $method = strtolower( trim( $_SERVER['REQUEST_METHOD'] ) );
  return ( $method == 'post' ? true : false );
}

function g_escape( $sql ) {
  $sql = str_replace( "_", "_._us_._", $sql );
  $sql = str_replace( "\n", "__nl__", $sql );
  $sql = str_replace( "\r", "__cr__", $sql );
  $sql = str_replace( "\t", "__tb__", $sql );
  $sql = str_replace( "\\", "__sl__", $sql );
  $sql = str_replace( '"', "__dq__", $sql );
  $sql = str_replace( "'", "__sq__", $sql );
  $sql = str_replace( "`", "__td__", $sql );
  return $sql;
}

function g_unescape( $sql ) {
  $sql = str_replace( "__nl__", "\n", $sql );
  $sql = str_replace( "__cr__", "\r", $sql );
  $sql = str_replace( "__tb__", "\t", $sql );
  $sql = str_replace( "__sl__", "\\", $sql );
  $sql = str_replace( "__dq__", '"', $sql );
  $sql = str_replace( "__sq__", "'", $sql );
  $sql = str_replace( "__td__", "`", $sql );
  $sql = str_replace( "_._us_._", "_", $sql );
  return $sql;
}

function g_exec_common( $sql ) {
  global $g_config;

  $host = $g_config['common.host'];
  $port = $g_config['common.port'];
  $user = $g_config['common.username'];
  $pass = $g_config['common.password'];
  $dbname = $g_config['common.database'];

  $cmd = $g_config['common.command'];
  if ( strpos( $cmd, 'mariadb' ) !== false ) {
    $cmd .= " --skip-ssl-verify-server-cert";
  } else if ( strpos( $cmd, 'mysql' ) !== false ) {
    $cmd .= " --ssl-mode=DISABLED";  
  }

  $tmp_dir = $g_config['common.tmpdir'];
  @mkdir( $tmp_dir, 0777, true );
  $uid = uniqid();
  $ufn = $tmp_dir . '/' . $uid . '.sql';
  $fn = $uid . '.sql';
  @file_put_contents( $ufn, $sql );

  $query = "cd $tmp_dir && $cmd --disable-auto-rehash -h $host -P $port --user=$user --password=$pass -e \"use $dbname; source ./$fn ; \" ";
  $text = @shell_exec($query) . '';
  @unlink( $ufn );
  return $text;
}

function g_exec_ara( $sql ) {
  global $g_config;

  $host = $g_config['ara.host'];
  $port = $g_config['ara.port'];
  $user = $g_config['ara.username'];
  $pass = $g_config['ara.password'];
  $dbname = $g_config['ara.database'];

  $cmd = $g_config['ara.command'];
  if ( strpos( $cmd, 'mariadb' ) !== false ) {
    $cmd .= " --skip-ssl-verify-server-cert";
  } else if ( strpos( $cmd, 'mysql' ) !== false ) {
    $cmd .= " --ssl-mode=DISABLED";  
  }

  $tmp_dir = $g_config['ara.tmpdir'];
  @mkdir( $tmp_dir, 0777, true );
  $uid = uniqid();
  $ufn = $tmp_dir . '/' . $uid . '.sql';
  $fn = $uid . '.sql';
  @file_put_contents( $ufn, $sql );

  $query = "cd $tmp_dir && $cmd --disable-auto-rehash -h $host -P $port --user=$user --password=$pass -e \"use $dbname; source ./$fn ; \" ";
  $text = @shell_exec($query) . '';
  @unlink( $ufn );
  return $text;
}

function g_exec_admin( $sql ) {
  global $g_config;

  $host = $g_config['admin.host'];
  $port = $g_config['admin.port'];
  $user = $g_config['admin.username'];
  $pass = $g_config['admin.password'];
  $dbname = $g_config['admin.database'];

  $cmd = $g_config['admin.command'];
  if ( strpos( $cmd, 'mariadb' ) !== false ) {
    $cmd .= " --skip-ssl-verify-server-cert";
  } else if ( strpos( $cmd, 'mysql' ) !== false ) {
    $cmd .= " --ssl-mode=DISABLED";  
  }

  $tmp_dir = $g_config['admin.tmpdir'];
  @mkdir( $tmp_dir, 0777, true );
  $uid = uniqid();
  $ufn = $tmp_dir . '/' . $uid . '.sql';
  $fn = $uid . '.sql';
  @file_put_contents( $ufn, $sql );

  $query = "cd $tmp_dir && $cmd --disable-auto-rehash -h $host -P $port --user=$user --password=$pass -e \"use $dbname; source ./$fn ; \" ";
  $text = @shell_exec($query) . '';
  @unlink( $ufn );
  return $text;
}

function g_login_common() {
  global $g_config;
  $user = g_escape( $g_config['common.dbuser'] );
  $pass = g_escape( $g_config['common.dbpass'] );
  $sql = "set @v_error = ''; set @v_user = ''; call ara.unescape( '$user', @v_user ); set @v_pass = ''; call ara.unescape( '$pass', @v_pass ); set @v_token = ''; call ara.login( @v_user, @v_pass, @v_token, @v_error ); select @v_token;";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) return false;
  $token = trim( $lines[1] );
  if ( $token === '' ) return false;
  return $token;
}

function g_login_ara() {
  global $g_config;
  $user = g_escape( $g_config['ara.dbuser'] );
  $pass = g_escape( $g_config['ara.dbpass'] );
  $sql = "set @v_error = ''; set @v_user = ''; call ara.unescape( '$user', @v_user ); set @v_pass = ''; call ara.unescape( '$pass', @v_pass ); set @v_token = ''; call ara.login( @v_user, @v_pass, @v_token, @v_error ); select @v_token;";
  $text = g_exec_ara( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) return false;
  $token = trim( $lines[1] );
  if ( $token === '' ) return false;
  return $token;
}

function g_logout( $p_token ) {
  global $g_config;
  $token = g_escape( $p_token );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); call ara.logout( @v_token );";
  $text = g_exec_common( $sql );
}

function g_login_admin() {
  global $g_config;
  $user = g_escape( $g_config['admin.dbuser'] );
  $pass = g_escape( $g_config['admin.dbpass'] );
  $sql = "set @v_error = ''; set @v_user = ''; call ara.unescape( '$user', @v_user ); set @v_pass = ''; call ara.unescape( '$pass', @v_pass ); set @v_token = ''; call ara.login( @v_user, @v_pass, @v_token, @v_error ); select @v_token;";
  $text = g_exec_admin( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) return false;
  $token = trim( $lines[1] );
  if ( $token === '' ) return false;
  return $token;
}

function g_create_user( $username, $password, $name, $email, $phone ) {
  global $g_config;
  $token = g_login_admin();
  if ( $token === false ) {
    return false;
  }
  $token = g_escape( $token );
  $username = g_escape( $username );
  $password = g_escape( $password );
  $name = g_escape( $name );
  $email = g_escape( $email );
  $phone = g_escape( $phone );
  $api_call = 1;
  $user_make = 0;
  $user_demo = 0;
  $quota = 1024 * 1024 * 64;
  $sql_lo = "set @v_token = ''; call ara.unescape('$token', @v_token); call ara.logout(@v_token);";
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_username = ''; call ara.unescape('$username', @v_username); set @v_password = ''; call ara.unescape('$password', @v_password); set @v_name = ''; call ara.unescape('$name', @v_name); set @v_email = ''; call ara.unescape('$email', @v_email); set @v_phone = ''; call ara.unescape('$phone', @v_phone); set @v_api_call = $api_call; set @v_user_make = $user_make; set @v_user_demo = $user_demo; set @v_quota = $quota; set @v_user_id = -1; call ara.create_user( @v_token, @v_username, @v_password, @v_name, @v_email, @v_phone, @v_api_call, @v_user_make, @v_user_demo, @v_quota, @v_user_id ); select @v_user_id;";
  $text = g_exec_admin( $sql );
  if ( $text === null ) {
    g_exec_admin( $sql_lo );
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) {
    g_exec_admin( $sql_lo );
    return false;
  }
  $num = trim( $lines[1] );
  if ( $num . '' === '' ) {
    g_exec_admin( $sql_lo );
    return false;
  }
  $num = intval( $num . '' );
  if ( $num < 0 ) {
    g_exec_admin( $sql_lo );
    return false;
  }
  g_exec_admin( $sql_lo );
  return true;
}

function g_update_user( $token, $name, $email, $phone ) {
  global $g_config;
  $token = g_escape( $token );
  $name = g_escape( $name );
  $email = g_escape( $email );
  $phone = g_escape( $phone );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_name = ''; call ara.unescape('$name', @v_name); set @v_email = ''; call ara.unescape('$email', @v_email); set @v_phone = ''; call ara.unescape('$phone', @v_phone); call ara.update_user( @v_token, @v_name, @v_email, @v_phone );";
  g_exec_common( $sql );
}

function g_air_cache( $query, &$reply ) {
  global $g_config;
  $reply = '_';
  $token = g_login_ara();
  if ( $token === false ) return false;
  $token = g_escape( $token );
  $query = g_escape( $query );
  $sql_lo = "set @v_token = ''; call ara.unescape('$token', @v_token); call ara.logout(@v_token);";
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_query = ''; call ara.unescape('$query', @v_query); set @v_reply = '_'; call ara.air_cache( @v_token, @v_query, @v_reply ); select @v_reply;";
  $text = g_exec_ara( $sql );
  if ( $text === null ) {
    g_exec_ara( $sql_lo );
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) {
    g_exec_ara( $sql_lo );
    return false;
  }
  $reply = trim( $lines[1] );
  if ( $reply === '_' ) {
    g_exec_ara( $sql_lo );
    return false;
  }
  $reply = g_unescape( $reply );
  g_exec_ara( $sql_lo );
  return true;
}

function g_air_my_cache( $token, $query, &$reply ) {
  global $g_config;
  $reply = '_';
  $token = g_escape( $token );
  $query = g_escape( $query );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_query = ''; call ara.unescape('$query', @v_query); set @v_reply = '_'; call ara.air_cache( @v_token, @v_query, @v_reply ); select @v_reply;";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) {
    return false;
  }
  $reply = trim( $lines[1] );
  if ( $reply === '_' ) {
    return false;
  }
  $reply = g_unescape( $reply );
  return true;
}

function g_login_common_user( $user, $pass, &$error ) {
  global $g_config;
  $user = g_escape( $user );
  $pass = g_escape( $pass );
  $error = '';
  $sql = "set @v_error = ''; set @v_user = ''; call ara.unescape( '$user', @v_user ); set @v_pass = ''; call ara.unescape( '$pass', @v_pass ); set @v_token = ''; call ara.login( @v_user, @v_pass, @v_token, @v_error ); select @v_token, @v_error;";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) return false;
  $ln = trim( $lines[1] );
  $fields = explode( "\t", $ln );
  $token = trim( $fields[0] );
  if ( $token === '' ) return false;
  $error = trim( $fields[1] );
  return $token;
}

function g_is_online( $token ) {
  global $g_config;
  $token = g_escape( $token );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_is_online = -1; call ara.is_online( @v_token, @v_is_online ); select @v_is_online;";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) {
    return false;
  }
  $num = trim( $lines[1] );
  if ( $num . '' === '1' ) {
    return true;
  } else if ( $num . '' === '0' ) {
    return false;
  }
  return false;
}

function g_ais_list( $token ) {
  global $g_config;
  $token = g_escape( $token );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); call ara.ais_list( @v_token );";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) < 2 ) {
    return false;
  }
  return $text;
}

function g_current_user( $token ) {
  global $g_config;
  $token = g_escape( $token );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_user_id = -1; set @v_username = ''; set @v_name = '', set @v_email = ''; set @v_phone = ''; call ara.`current_user`( @v_token, @v_user_id, @v_username, @v_name, @v_email, @v_phone ); set @v_user_demo = 0; call ara.has_right( @v_token, 'user_demo', @v_user_demo); select @v_user_id as `id`, @v_username as `username`, @v_name as `name`, @v_email as `email`, @v_phone as `phone`, @v_user_demo as `user_demo`;";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) < 2 ) {
    return false;
  }
  return $text;
}

function g_current_username( $token ) {
  global $g_config;
  $token = g_escape( $token );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_user_id = -1; set @v_username = ''; set @v_name = '', set @v_email = ''; set @v_phone = ''; call ara.`current_user`( @v_token, @v_user_id, @v_username, @v_name, @v_email, @v_phone ); set @v_user_demo = 0; call ara.has_right( @v_token, 'user_demo', @v_user_demo); select @v_username as `username`;";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) < 2 ) {
    return false;
  }
  return trim( $lines[1] );
}

function g_chpwd( $token, $password ) {
  global $g_config;
  $token = g_escape( $token );
  $password = g_escape( $password );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_password = ''; call ara.unescape('$password', @v_password); call ara.chpwd( @v_token, @v_password );";
  g_exec_common( $sql );
}

function g_air_list( $token, $ai, $tag, $code, $page_no, $page_size ) {
  global $g_config;
  $token = g_escape( $token );
  $ai = g_escape( $ai );
  $tag = g_escape( $tag );
  $code = g_escape( g_slug($code) );
  $page_no = intval( $page_no . '' );
  $page_size = intval( $page_size . '' );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_ai = ''; call ara.unescape('$ai', @v_ai); set @v_tag = ''; call ara.unescape('$tag', @v_tag); set @v_code = ''; call ara.unescape('$code', @v_code); set @v_page_no = $page_no; set @v_page_size = $page_size; call ara.air_list( @v_token, @v_ai, @v_tag, @v_code, @v_page_no, @v_page_size );";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) < 2 ) {
    return "id\tquery\treply\tai_slug\tai_name\ttags\tcode";
  }
  return $text;
}

function g_aircache_list( $username, $code, $page_no, $page_size ) {
  global $g_config;
  $username = g_escape( $username );
  $query = $code;
  $code = g_escape( g_slug($code) );
  $page_no = intval( $page_no . '' );
  $page_size = intval( $page_size . '' );
  $sql = "set @v_username = ''; call ara.unescape('$username', @v_username); set @v_code = ''; call ara.unescape('$code', @v_code); set @v_page_no = $page_no; set @v_page_size = $page_size; call ara.aircache_list( @v_username, @v_code, @v_page_no, @v_page_size );";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) < 2 ) {
    $reply = '';
    g_openrouter_ai( $query, $reply );
    $reply = trim( $reply );
    if ( $reply === '' ) {
      return "id\tquery\treply\tai_slug\tai_name\ttags\tcode";
    } else {
      $output = "id\tquery\treply\tai_slug\tai_name\ttags\tcode";
      $output .= "\n1\t" . g_slug($query) . "\t" . g_escape($reply) . "\t" . g_slug('Open Router') . "\tOpen Router\t" . g_slug('google/gemma-4-26b-a4b-it:free') . "\t" . uniqid();

      if ( !g_aircache_check( $username, $query ) ) {
        $token = g_login_ara();
        if ( $token !== false ) {
          g_save_air( $token, 'others', 'pattern', g_slug($query), $reply );
        }
        g_logout( $token );
      }

      return $output;
    }
  }
  return $text;
}

function g_aircache_check( $username, $code ) {
  global $g_config;
  $username = g_escape( $username );
  $code = g_escape( g_slug($code) );
  $sql = "set @v_username = ''; call ara.unescape('$username', @v_username); set @v_code = ''; call ara.unescape('$code', @v_code); set @v_find = 0; call ara.aircache_check( @v_username, @v_code, @v_find ); select @v_find;";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) < 2 ) {
    return false;
  }
  $ln = trim( $lines[1] );
  if ( $ln === '1' ) return true;
  return false;
}

function g_tag_list( $token, $page_no, $page_size ) {
  global $g_config;
  $token = g_escape( $token );
  $page_no = intval( $page_no . '' );
  $page_size = intval( $page_size . '' );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_page_no = $page_no; set @v_page_size = $page_size; call ara.tag_list( @v_token, @v_page_no, @v_page_size );";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) < 2 ) {
    return false;
  }
  $tags = [];
  for ( $i = 1; $i < count( $lines ); $i++ ) {
    $ln = trim( g_unescape( $lines[ $i ] ) );
    $fields = explode( ',', $ln );
    for ( $j = 0; $j < count( $fields ); $j++ ) {
      $fd = trim( $fields[ $j ] );
      if ( $fd === '' ) continue;
      if ( in_array( $fd, $tags ) ) continue;
      $tags[] = $fd;
    }
  }
  return $tags;
}

function g_delete_air( $token, $code ) {
  global $g_config;
  $token = g_escape( $token );
  $code = g_escape( $code );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_code = ''; call ara.unescape('$code', @v_code); call ara.delete_air( @v_token, @v_code );";
  g_exec_common( $sql );
}

function g_all_tags( $token ) {
  $page_size = 20;
  $page_no = 1;
  $tags = [];
  $rs = g_tag_list( $token, $page_no, $page_size );
  while ( $rs !== false ) {
    foreach ( $rs as $it ) {
      if ( in_array( $it, $tags ) ) continue;
      $tags[] = $it;
    }
    $page_no++;
    $rs = g_tag_list( $token, $page_no, $page_size );
  }
  sort( $tags );
  return $tags;
}

function g_slug( $src ) {
  $tag = '';
  $chars = 'abcdefghijklmnopqrstuvwxyz0123456789-_';
  for ( $i = 0; $i < strlen( $src ); $i++ ) {
    $c = strtolower($src[$i]);
    if ( strpos( $chars, $c ) !== false ) {
      $tag .= $c;
    } else if ( $c == ' ' ) {
      $tag .= '-';
    } else {
      $tag .= '_';
    }
  }
  while ( strpos( $tag, "__" ) !== false ) {
    $tag = str_replace( "__", "_", $tag );
  }
  while ( strpos( $tag, "--" ) !== false ) {
    $tag = str_replace( "--", "-", $tag );
  }
  if ( strlen( $tag ) === 0 ) return $tag;
  if ( $tag[0] === '-' || $tag[0] === '_' ) {
    $tag = substr( $tag, 1 );
  }
  if ( strlen( $tag ) === 0 ) return $tag;
  if ( $tag[strlen($tag)-1] === '-' || $tag[strlen($tag)-1] === '_' ) {
    $tag = substr( $tag, 0, strlen($tag) - 1 );
  }
  return $tag;
}

function g_save_air( $token, $ai, $tags, $query, $reply ) {
  global $g_config;
  $token = g_escape( $token );
  $ai = g_escape( $ai );
  $query = g_escape( $query );
  $reply = g_escape( $reply );
  $ntags = '';
  $fields = explode( ",", $tags );
  for ( $i = 0; $i < count( $fields ); $i++ ) {
    $tmp = trim($fields[$i]);
    if ( $tmp === '' ) continue;
    $tmp = g_slug( $tmp );
    if ( $ntags !== '' ) $ntags .= ' , ';
    $ntags .= $tmp;
  }
  if ( $ntags === '' ) {
    $ntags = ' , ';
  } else {
    $ntags = ' , ' . $ntags . ' , ';
  }
  $tags = g_escape( $ntags );
  $code = g_escape( uniqid() );
  $sql = "set @v_token = ''; call ara.unescape('$token', @v_token); set @v_ai = ''; call ara.unescape('$ai', @v_ai); set @v_code = ''; call ara.unescape('$code', @v_code); set @v_tags = ''; call ara.unescape('$tags', @v_tags); set @v_query = ''; call ara.unescape('$query', @v_query); set @v_reply = ''; call ara.unescape('$reply', @v_reply); set @v_air_id = -1; call ara.save_air( @v_token, @v_ai, @v_code, @v_tags, @v_query, @v_reply, @v_air_id ); select @v_air_id;";
  $text = g_exec_common( $sql );
  if ( $text === null ) {
    return false;
  }
  $lines = explode( "\n", trim($text) );
  if ( count( $lines ) !== 2 ) {
    return false;
  }
  $ln = trim( $lines[1] );
  $id = intval( $ln );
  if ( $id <= 0 ) return false;
  return $id;
}

function g_take_air( $token, $query, $machine, $tags ) {
  if ( g_is_online( $token ) === false ) return false;
  if ( $machine === 'google-ai-search' ) {
    return g_take_air_google_ai_search( $token, $query, $machine, $tags );
  } else if ( $machine === 'bing-copilot-search' ) {
    return g_take_air_bing_copilot_search( $token, $query, $machine, $tags );
  } else if ( $machine === 'chatgpt' ) {
    return g_take_air_chatgpt( $token, $query, $machine, $tags );
  } else if ( $machine === 'others' ) {
    return g_take_air_others( $token, $query, $machine, $tags );
  } else {
    return false;
  }
}

function g_split_air( $air, &$query, &$reply ) {
  $query = '_';
  $reply = $air;
  $idx = strpos( $air, "```aiq" );
  if ( $idx !== false ) {
    $idx_2 = strpos( $air, "```", $idx + 6 );
    if ( $idx_2 !== false ) {
      $query = trim( substr( $air, $idx + 6, $idx_2 - ($idx + 6) ) );
      $query = g_slug( $query );
      $reply = trim(substr( $air, $idx_2 + 3 ));
    }
  }
}

function g_fill_cache( $air ) {
  $reply = '';
  $start = 0;
  $idx = strpos( $air, "```airc", $start );
  while ( $idx !== false ) {
    $idx_2 = strpos( $air, "```", $idx + 7 );
    if ( $idx_2 !== false ) {
      $query = trim( substr( $air, $idx + 7, $idx_2 - ($idx + 7) ) );
      $raw_query = $query . '';
      $cache = '';
      if ( $raw_query !== '' ) {
        $query = g_slug( $query );
        $rs = g_air_cache( $query, $cache );
        if ( $rs === false || trim( $cache ) === '' ) {
          $token = g_login_ara();
          if ( $token !== false ) {
            $username = g_current_username( $token );
            g_openrouter_ai( $raw_query, $cache );
            $cache = trim( $cache );
            if ( $cache !== '' ) {
              if ( !g_aircache_check( $username, $raw_query ) ) {
                g_save_air( $token, 'others', 'pattern', g_slug($raw_query), $cache );
              }
            }
            g_logout( $token );
          }
        }
      }
      $reply .= substr( $air, $start, $idx ) . $cache;
      $start = $idx_2 + 3;
    } else {
      $start = $idx + 7;
    }
    $idx = strpos( $air, "```airc", $start );
  }
  $reply .= substr( $air, $start );
  return $reply;
}

function g_fill_my_cache( $token, $air ) {
  $reply = '';
  $start = 0;
  $idx = strpos( $air, "```airmc", $start );
  while ( $idx !== false ) {
    $idx_2 = strpos( $air, "```", $idx + 8 );
    if ( $idx_2 !== false ) {
      $query = trim( substr( $air, $idx + 8, $idx_2 - ($idx + 8) ) );
      $raw_query = $query . '';
      $cache = '';
      if ( $raw_query !== '' ) {
        $query = g_slug( $query );
        $rs = g_air_my_cache( $token, $query, $cache );
        if ( $rs === false || trim($cache) === '' ) {
          $username = g_current_username( $token );
          g_openrouter_ai( $raw_query, $cache );
          $cache = trim( $cache );
          if ( $cache !== '' ) {
            if ( !g_aircache_check( $username, $raw_query ) ) {
              $token = g_login_ara();
              if ( $token !== false ) {
                g_save_air( $token, 'others', 'pattern', g_slug($raw_query), $cache );
              }
              g_logout( $token );
            }
          }
        }
      }
      $reply .= substr( $air, $start, $idx ) . $cache;
      $start = $idx_2 + 3;
    } else {
      $start = $idx + 7;
    }
    $idx = strpos( $air, "```airc", $start );
  }
  $reply .= substr( $air, $start );
  return $reply;
}

function g_take_air_google_ai_search( $token, $air, $ai, $tags ) {
  $query = '_';
  $reply = '';
  g_split_air( $air, $query, $reply );
  $reply = g_fill_cache( $reply );
  $reply = g_fill_my_cache( $token, $reply );
  return g_save_air( $token, $ai, $tags, $query, $reply );
}

function g_take_air_bing_copilot_search( $token, $air, $ai, $tags ) {
  $query = '_';
  $reply = '';
  g_split_air( $air, $query, $reply );
  $reply = g_fill_cache( $reply );
  $reply = g_fill_my_cache( $token, $reply );
  return g_save_air( $token, $ai, $tags, $query, $reply );
}

function g_take_air_chatgpt( $token, $air, $ai, $tags ) {
  $query = '_';
  $reply = '';
  g_split_air( $air, $query, $reply );
  $reply = g_fill_cache( $reply );
  $reply = g_fill_my_cache( $token, $reply );
  return g_save_air( $token, $ai, $tags, $query, $reply );
}

function g_take_air_others( $token, $air, $ai, $tags ) {
  $query = '_';
  $reply = '';
  g_split_air( $air, $query, $reply );
  $reply = g_fill_cache( $reply );
  $reply = g_fill_my_cache( $token, $reply );
  return g_save_air( $token, $ai, $tags, $query, $reply );
}

function g_openrouter_ai( $query, &$reply ) {
  global $g_config;
  $curl_cmd = "/data/data/com.termux/files/usr/bin/curl";
  $api_key = $g_config['openrouter_ai_api_key'];
  $data = [
    'model' => 'google/gemma-4-26b-a4b-it:free',
    'messages' => [
      [
        'role' => 'user',
        'content' => $query
      ]
    ],
    'reasioning' => [
      'enabled' => true
    ]
  ];
  $reply = '';
  $json = json_encode( $data );
  $size = strlen( $json );
  $url = 'https://openrouter.ai/api/v1/chat/completions';
  $cmd = "$curl_cmd --connect-timeout 3600 --max-time 3600 -X POST \"$url\" -H \"Authorization: Bearer $api_key\" -H \"Content-Type: application/json\" -d '$json'";
  $text = @shell_exec( $cmd );
  if ( $text === null ) $text = '_';
  if ( $text !== '_' ) {
    $obj = json_decode( $text, true );
    if (isset( $obj['created'])) {
      if (isset( $obj['choices'])) {
        $it = $obj['choices'][0];
        if (isset($it['message'])) {
          $reply = $it['message']['content'];
          return;
        }
      }
    }
  }
}

?>
