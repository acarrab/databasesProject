<?php
class User {
  public $uid = null;
  public $f_name = null;
  public $l_name = null;
  public $username = null;
  public $email = null;
  public $channel = null;
  public $is_contact = null;

  public function __construct($uid, $f_name, $l_name, $username, $email, $channel) {
    $this->uid = $uid;
    $this->f_name = $f_name;
    $this->l_name = $l_name;
    $this->username = $username;
    $this->email = $email;
    $this->channel = $channel;
  }
}

class PublicUser {
  public $f_name = null;
  public $l_name = null;
  public $username = null;
  public $email = null;
  public $channel = null;
  public $is_contact = null;

  public function __construct($user) {
    $this->f_name = $user->f_name;
    $this->l_name = $user->l_name;
    $this->username = $user->username;
    $this->email = $user->email;
    $this->channel = $user->channel;
    $this->is_contact = $user->is_contact;
  }
}

function make_public($user) { return new PublicUser($user); }
?>