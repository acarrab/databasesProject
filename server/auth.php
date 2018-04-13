<?php
require_once(dirname(__FILE__)."/user.php");
require_once(dirname(__FILE__)."/connect.php");
require_once(dirname(__FILE__)."/requests.php");
require_once(dirname(__FILE__)."/state.php");




/*****************************************************************************/
/*                    Handles authentication for the users                   */
/*****************************************************************************/
class Auth {

  public static function logout() { $s = &State::get_instance(); $s->user = null; }

  private static function hash($password) { return password_hash(trim($password), PASSWORD_DEFAULT); }

  private static function put_user(&$user) {
    $pub_user = new PublicUser($user);
    Request::put_data($user);

  }

  private static function validate_pass($username, $password) {
    $db = &Database::get_instance();

    $sql="SELECT * FROM user WHERE username='$username'";
    $login = &$db->exec_query($sql);

    $user = $login->fetch_object();

    if ($user && password_verify($password, $user->password)) {
      return new User($user->uid, $user->f_name, $user->l_name, $user->username, $user->email, $user->channel);
    }

    Errors::unauthorized();
  }

  private static function get_user_object($uid) {
    $db = &Database::get_instance();

    $sql="SELECT * FROM user WHERE uid='$uid'";
    $login = &$db->exec_query($sql);

    $user = $login->fetch_object();

    if ($user) { return $user; }
    Errors::server_error("User not found");
  }

  public static function create_account($user) {
    // We must add a check to see if it actually exists

    $hashpass = &self::hash($user->password);
    $sql = "INSERT INTO user (f_name, l_name, email, username, channel, password) VALUES ".
      "('$user->f_name'".
      ",'$user->l_name'".
      ",'$user->email'".
      ",'$user->username'".
      ",'$user->channel'".
      ",'$hashpass')";
    $db = &Database::get_instance();
    $db->exec_query($sql);
    self::login($user->username, $user->password);
  }

  public static function update_password($passdata) {
    $s = &State::get_instance();


    $user = self::validate_pass($s->user->username, $passdata->old_password);


    $hashpass = &self::hash($passdata->password);


    $sql = "UPDATE user SET password='$hashpass' WHERE uid='$user->uid'";
    $db = &Database::get_instance();
    $db->exec_query($sql);


    $s->user = self::get_user_object($user->uid);
    self::put_user($s->user);
  }

  public static function update_account($user) {
    $s = &State::get_instance();
    $u = $s->user;
    $sql = null;


    // make sure there is no collision with username or email
    if ($u->username !== $user->username && $u->email !== $user->email) {
      $sql = "SELECT * FROM user WHERE username = '$user->username' OR email = '$user->email'";
    } else if ($u->username !== $user->username) {
      $sql = "SELECT * FROM user WHERE username = '$user->username'";
    } else if ($u->email !== $user->email) {
      $sql = "SELECT * FROM user WHERE email = '$user->email'";
    }



    $db = &Database::get_instance();
    if ($sql !== null) {
      if ($result = $db->exec_query($sql)) {

	if ($row = $result->fetch_assoc()) {
	  Errors::bad_request();
	}
	$result->free();
      }
    }

    $sql="UPDATE user SET "
      . "f_name='$user->f_name',"
      . "l_name='$user->l_name',"
      . "email='$user->email',"
      . "username='$user->username' "
      . "WHERE uid='$u->uid'";


    $db->exec_query($sql);


    $s->user = self::get_user_object($u->uid);
    self::put_user($s->user);
  }

  /***************************************************************************/
  /*                                  login                                  */
  /***************************************************************************/
  public static function login($username, $password) {
    $user = &self::validate_pass($username, $password);

    $s = &State::get_instance();
    $s->user = $user;
    self::put_user($s->user);
  }
  // checks if the user is logged in
  public static function islogged() { $s = &State::get_instance(); return $s->user !== null; }
  public static function assert_access() { if (!$islogged) { Errors::unauthorized(); } }
}

?>
