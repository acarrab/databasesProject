<?php

require_once(dirname(__FILE__)."/../connect.php");

// get dabase connection
$db = new Database();
$db->exec_query("CREATE TABLE users (
id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
f_name VARCHAR(30) NOT NULL,
l_name VARCHAR(30) NOT NULL,
username VARCHAR(50) NOT NULL,
password CHAR(128) NOT NULL,
email VARCHAR(50) NOT NULL
);");
?>
