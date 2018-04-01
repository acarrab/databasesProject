<?php

class Database {

  public $conn;

  public function __construct() {
    $server_name = "mysql1.cs.clemson.edu";
    $user_name = "MeTubeDB_jbfy";
    $password = "hereareabunchofrandomcharactersandstuff1";
    $our_database = "MeTubeDB_dak6";

    $this->conn = new mysqli($server_name, $user_name, $password);

    if ($this->conn->connect_error) {
      die("Connection failed: " . $this->conn->connect_error . "\n");
    }
    echo "Connected Successfully\n";

    $this->conn->select_db($our_database);
    $this->conn->set_charset("utf8");
  }

  public function exec_query($sql) {
    $res = $this->conn->query($sql);
    if ( !$res ) {
      header("HTTP/1.1 500 Internal Server Error");
      exit($this->conn->error . "\n");
    }
    return $res;
  }

}

?>