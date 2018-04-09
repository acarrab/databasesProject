<?php
require_once(dirname(__FILE__)."/users/user.php");
require_once(dirname(__FILE__)."/connect.php");
require_once(dirname(__FILE__)."/requests.php");
require_once(dirname(__FILE__)."/state.php");




/*****************************************************************************/
/*                    Handles authentication for the users                   */
/*****************************************************************************/
class Auth {

  public static function logout() { $s = &State::get_instance(); $s->user = null; }

  private static function hash($password) { return password_hash(trim($password), PASSWORD_DEFAULT); }


  public static function create_account($user) {
    // We must add a check to see if it actually exists

    $hashpass = &self::hash($user->password);
    $sql = "INSERT INTO user (f_name, l_name, email, username, password) VALUES ".
      "('$user->f_name'".
      ",'$user->l_name'".
      ",'$user->email'".
      ",'$user->username'".
      ",'$hashpass')";
    $db = Database::get_instance();
    $db->exec_query($sql);
    self::login($user->username, $user->password);
  }

  /***************************************************************************/
  /*                                  login                                  */
  /***************************************************************************/
  public static function login($username, $password) {
    $db = &Database::get_instance();
    $sql="SELECT * FROM user WHERE user.username='$username'";
    $login = &$db->exec_query($sql);
    //$query = mysqli_query($db,$login);
    $user = $login->fetch_object();
    if ( !$user ) {
      exit("$username does not exist");
    }

    if(password_verify($password, $user->password)) {
      $s = &State::get_instance();
      $s->user = new User($user->uid, $user->f_name, $user->l_name, $user->username, $user->email);
      $publicUser = new PublicUser($s->user);
      Request::put_data($publicUser);
    } else {
        Errors::unauthorized();
    }

  }
  // checks if the user is logged in
  public static function islogged() { $s = &State::get_instance(); return $s->user !== null; }

}

?>
