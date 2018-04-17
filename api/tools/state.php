<?php
class State {
  public $user;

  private function __construct() {
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