<?php
function g_param( $key ) {
    if ( isset( $_POST[ $key ] ) ) return $_POST[ $key ];
    if ( isset( $_GET[ $key ] ) ) return $_GET[ $key ];
    return '';
}  
$token = '_____________';
$host = '';
if ( g_param( 'token' ) === $token ) {
    $host = g_param('host');
    $domain = '.free.pinggy.net';
    $idx = strpos( $host, $domain );
    if ( $idx + strlen( $domain ) === strlen( $host ) ) {
        @file_put_contents( __DIR__ . '/host.txt', $host );
    } 
}
?>
<html>
<head>
    <title>Synchronize | [airespaker] AI Response Taker</title>    
    <style>
        body {
            padding: 10px;
            margin: 0px;
            font-family: monospace;
            font-size: 12px;
            color: black;
            background-color: white;
        }
    </style>
</head>
<body>
Synchronized Host: <?php print( $host ) ?>
</body>
</html>
