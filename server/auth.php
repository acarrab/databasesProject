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

  private static function hash($password) { return password_hash($password, PASSWORD_DEFAULT); }


  public static function create_account($user, $password) {
    $hashed_password = &self::hash($password);
    $db = Database::get_instance();
    $db->exec_query("INSERT INTO users (f_name, l_name, email, username, password) VALUES ".
		    "('$user->f_name'".
		    ",'$user->l_name'".
		    ",'$user->email'".
		    ",'$user->username'".
		    ",'$hashed_password')"
		    );
  }

  /***************************************************************************/
  /*                                  login                                  */
  /***************************************************************************/
  public static function login($username, $password) {
    if ( $username != "tacobot" || $password != "bot" ) {
      Errors::unauthorized();
    } else {
      $s = &State::get_instance();
      $s->user = new User("randomid", "Taco", "Bot", "TacoBot314", "tacobot@gmail.com");

    }
  }
  // checks if the user is logged in
  public static function islogged() { $s = &State::get_instance(); return $s->user !== null; }

}

?>