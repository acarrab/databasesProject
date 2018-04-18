<?php

require_once(dirname(__FILE__) . '/../tools.php');

class Auth {

  private static function hash($password) {
    return password_hash(trim($password), PASSWORD_DEFAULT);
  }

  private static function validate_password($username, $password) {
    $db = &Database::get_instance();
    $user = &$db->get_object("SELECT * FROM user WHERE username='$username'");
    if ($user && password_verify($password, $user->password)) { return $user; }
    Errors::unauthorized();
  }

  public static function logout() {
    $s = &State::get_instance();
    session_destroy();
  }

  public static function login($username, $password) {
    session_destroy();
    $user = &self::validate_password($username, $password);
    $s = &State::get_instance();
    $s->user = $user;
    $pub_user = new PublicUser($s->user);
    return $pub_user;
  }

  public static function create_account($u) {
    $db = &Database::get_instance();
    $hashpass = &self::hash($u->password);
    $sql = "INSERT INTO user (f_name, l_name, email, username, channel, password) VALUES ".
      "('$u->f_name', '$u->l_name', '$u->email', '$u->username', '$u->channel', '$hashpass')";
    $db->exec_query($sql);
    $pub_user = &self::login($u->username, $u->password);
    return $pub_user;
  }

  public static function update_password($password, $old_password) {
    $s = &State::get_instance();
    $u = self::validate_password($s->user->username, $old_password);
    $hashpass = &self::hash($password);

    $db = &Database::get_instance();
    $db->exec_query("UPDATE user SET password='$hashpass' WHERE uid='$u->uid'");

    $s->user = $db->get_object("SELECT * FROM user WHERE uid='$u->uid'");
    $pub_user = new PublicUser($s->user);
    return $pub_user;
  }

  public static function update_account($u) {
    $s = &State::get_instance();
    $user = $s->user;
    $sql = null;


    // make sure there is no collision with username or email
    if ($u->username !== $user->username && $u->email !== $user->email) {
      $sql = "SELECT * FROM user WHERE username = '$u->username' OR email = '$u->email'";
    } else if ($u->username !== $user->username) {
      $sql = "SELECT * FROM user WHERE username = '$u->username'";
    } else if ($u->email !== $user->email) {
      $sql = "SELECT * FROM user WHERE email = '$u->email'";
    }

    $db = &Database::get_instance();
    if ($sql !== null) {
      // are there others who already have that username/email
      $others = $db->get_objects($sql);
      if(count($others)) {
	Errors::bad_request();
      }
    }

    $sql = "UPDATE user SET ".
      "f_name='$u->f_name', ".
      "l_name='$u->l_name', ".
      "email='$u->email', ".
      "username='$u->username', ".
      "channel='$u->channel', ".
      "WHERE uid='$user->uid'";
    $db->exec_query($sql);

    $s->user = $db->get_object("SELECT * FROM user WHERE uid='$user->uid'");
    $pub_user = new PublicUser($s->user);
    return $pub_user;
  }


  public static function islogged() {
    $s = &State::get_instance();
    return $s->user !== null;
  }
  public static function assert_access() {
    if (!self::islogged()) { Errors::unauthorized(); }
  }
}