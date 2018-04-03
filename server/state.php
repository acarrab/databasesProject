<?php

$server = dirname(__FILE__);
$api = dirname(__FILE__)."../api";


require_once($server."/auth.php");

/* adds get set functionality to variable ************************************/
class MethodVar {
  private $value = null;
  public function __construct($value) { $this->value = $value; }
  public function get() { return $this->value; }
  public function set($value) { $this->value = $value; }
}

/* Maintains the state of the application. Should not rely on Auth. */

class State {
  public $search;
  public $user;


  private function __construct() {
    $this->search = new MethodVar('');
    $this->user = null;
  }


  public static function get_instance() {
    session_start();
    if ( !isset($_SESSION["user_state"]) ) {
      $_SESSION["user_state"] = new State();
    }
    return $_SESSION["user_state"];
  }
}

?>