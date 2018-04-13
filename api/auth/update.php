<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/auth.php");

if ( Request::is_post() ) {

  $user = &Request::validate_and_get_data(array("f_name", "l_name", "username", "email", "channel"));
  Auth::update_account($user);
  exit("Account creation successful.");

} else { Error::not_found(); }
?>
