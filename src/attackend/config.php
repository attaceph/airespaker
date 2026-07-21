<?php
global $g_config;

$g_config = array(

 'common.host' => '192.168.813.318',
 'common.port' => '3306',
 'common.username' => 'user',
 'common.password' => 'pass',
 'common.database' => 'db',
 'common.command' => '/data/data/com.termux/files/usr/bin/mariadb',
 'common.zip_cmd' => '/data/data/com.termux/files/usr/bin/zip',
 'common.php_cmd' => '/data/data/com.termux/files/usr/bin/php',
 'common.dbuser' => 'user',
 'common.dbpass' => 'pass',
 'common.tmpdir_rel' => true,
 'common.tmpdir.o' => '/data/data/com.termux/files/home/ara/tmp',
 'common.tmpdir' => '/tmp',

 'admin.host' => '192.168.813.818',
 'admin.port' => '3306',
 'admin.username' => 'user',
 'admin.password' => 'pass',
 'admin.database' => 'db',
 'admin.command' => '/data/data/com.termux/files/usr/bin/mariadb',
 'admin.zip_cmd' => '/data/data/com.termux/files/usr/bin/zip',
 'admin.php_cmd' => '/data/data/com.termux/files/usr/bin/php',
 'admin.dbuser' => 'user',
 'admin.dbpass' => 'pass',
 'admin.tmpdir_rel' => true,
 'admin.tmpdir.o' => '/data/data/com.termux/files/home/ara/tmp',
 'admin.tmpdir' => '/tmp',

 'ara.host' => '192.168.813.818',
 'ara.port' => '3306',
 'ara.username' => 'user',
 'ara.password' => 'pass',
 'ara.database' => 'db',
 'ara.command' => '/data/data/com.termux/files/usr/bin/mariadb',
 'ara.zip_cmd' => '/data/data/com.termux/files/usr/bin/zip',
 'ara.php_cmd' => '/data/data/com.termux/files/usr/bin/php',
 'ara.dbuser' => 'user',
 'ara.dbpass' => 'pass',
 'ara.tmpdir_rel' => true,
 'ara.tmpdir.o' => '/data/data/com.termux/files/home/ara/tmp',
 'ara.tmpdir' => '/tmp',

 'openrouter_ai_api_key' => '_____',

 'premium_daily_limit' => 0.16129032258,
 'premium_input_cost' => 0.1,
 'premium_output_cost' => 0.35

);

if ( $g_config['common.tmpdir_rel'] ) {
  $tmp_dir = $g_config['common.tmpdir'];
  $tmp_dir = __DIR__ . $tmp_dir . '/' . uniqid();
  $dir = dirname( $tmp_dir );
  @mkdir ( $dir, 0777, true );
  $g_config['common.tmpdir'] = $tmp_dir;
}

if ( $g_config['admin.tmpdir_rel'] ) {
  $tmp_dir = $g_config['admin.tmpdir'];
  $tmp_dir = __DIR__ . $tmp_dir . '/' . uniqid();
  $dir = dirname( $tmp_dir );
  @mkdir ( $dir, 0777, true );
  $g_config['admin.tmpdir'] = $tmp_dir;
}

if ( $g_config['ara.tmpdir_rel'] ) {
  $tmp_dir = $g_config['ara.tmpdir'];
  $tmp_dir = __DIR__ . $tmp_dir . '/' . uniqid();
  $dir = dirname( $tmp_dir );
  @mkdir ( $dir, 0777, true );
  $g_config['ara.tmpdir'] = $tmp_dir;
}

?>