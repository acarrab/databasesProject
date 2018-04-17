<?php
require_once(dirname(__FILE__)."/requests.php");
/*****************************************************************************/
/*                             Database Singleton                            */
/*****************************************************************************/
class Database {
  private static $instance = null;
  public static function get_instance() {
    if (self::$instance == null) { self::$instance = new Database(); }
    return self::$instance;
  }


  /* Connecting to the database **********************************************/
  private function __construct() {
    $server_name = "mysql1.cs.clemson.edu";
    $user_name = "dpebble";
    $password = "clemson4620";
    $our_database = "MeTubeADL";

    $this->conn = new mysqli($server_name, $user_name, $password);

    if ($this->conn->connect_error) {
      die("Connection failed: " . $this->conn->connect_error . "\n");
    }
    $this->conn->select_db($our_database);
    $this->conn->set_charset("utf8");
  }


  /* Public members **********************************************************/
  public $conn = null;
  public function exec_query($sql) {
    $res = $this->conn->query($sql);
    if ( !$res ) {
      header("HTTP/1.1 500 Internal Server Error");
      exit($this->conn->error . "\n\n" . "SQL: $sql");
    }
    return $res;
  }
  public function get_objects($sql) {
    $result = &$this->exec_query($sql);
    $rows=array();
    while ($row = $result->fetch_object()) {
      $rows[] = $row;
    }
    $result->close();
    return $rows;
  }

  public function get_object($sql) {
    $result = &$this->exec_query($sql);
    $row = $result->fetch_object();
    return $row;
  }

}
?>
