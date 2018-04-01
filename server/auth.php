<?php
require_once(dirname(__FILE__)."/users/user.php");


class Auth {

  // automatically cancels everything and sends unauthorized header
  private function no_access() {
    header("HTTP/1.1 401 Unauthorized");
    exit;
  }

  // starts this users session
  public function __construct() { session_start(); }
  // ends the users session
  public function logout() { session_destory(); }

  // logs in
  public function login() {

    if ( empty($data["username"]) || $data["username"] != "tacobot" ||
	 empty($data["password"]) || $data["password"] != "bot" ) {
      $this->no_access();
    }

    $_SESSION["user_object"] = new User();
  }

  // checks if the user is logged in
  public function islogged() { return isset($_SESSION["user_object"]); }

  // returns true if logged or calls no_access if not
  public function validate($type = "basic") { return islogged() || $this->no_access(); }
  // gets the user object or throws unauthorized
  public function get_user() { $this->validate(); return $_SESSION["user_object"]; }
}

?>