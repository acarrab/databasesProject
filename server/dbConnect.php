<?php


function db_connect() {
  $server_name = "mysql1.cs.clemson.edu";
  $user_name = "MeTubeDB_jbfy";
  $password = "hereareabunchofrandomcharactersandstuff1";
  $our_database = "MeTubeDB_dak6";

  $conn = new mysqli($server_name, $user_name, $password);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  echo "Connected Successfully";

  $conn->select_db($our_database);
  $conn->set_charset("utf8");

  return $conn;
}

?>