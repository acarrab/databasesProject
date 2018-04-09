<?php
$server = dirname(__FILE__)."/..";
require_once($server."/connect.php");
require_once($server."/auth.php");

// $db = new Database();

class User {
  public $uid = null;
  public $f_name = null;
  public $l_name = null;
  public $username = null;
  public $email = null;


  public function __construct($uid, $f_name, $l_name, $username, $email) {
    $this->uid = $uid;
    $this->f_name = $f_name;
    $this->l_name = $l_name;
    $this->username = $username;
    $this->email = $email;
  }
}

class PublicUser {
  public $f_name = null;
  public $l_name = null;
  public $username = null;
  public $email = null;


  public function __construct($user) {
    $this->f_name = $user->f_name;
    $this->l_name = $user->l_name;
    $this->username = $user->username;
    $this->email = $user->email;
  }
}
?>