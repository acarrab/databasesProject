<?php
$server = dirname(__FILE__)."/..";
require_once($server."/connect.php");
require_once($server."/auth.php");

// $db = new Database();

class User {
  public $uid;
  public $username;
  public $f_name;
  public $l_name;
  public $email;


  public function __construct() {
    $this->uid = "tacobot";
    $this->username = "tacobot";

    $this->f_name = "taco";
    $this->l_name = "bot";

    $this->email = "tacobot@gmail.com";
  }
}

?>