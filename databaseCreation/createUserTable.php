<?php

require_once("../server/dbConnect.php");

// get dabase connection
$db = db_connect();
$result = $db->query("CREATE TABLE users (
id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
f_name VARCHAR(30) NOT NULL,
l_name VARCHAR(30) NOT NULL,
username VARCHAR(50) NOT NULL,
password CHAR(128) NOT NULL,
email VARCHAR(50) NOT NULL
);");

if ( !$result ) {
  header("HTTP/1.1 500 Internal Server Error");
  exit($db->error);
}


?>
