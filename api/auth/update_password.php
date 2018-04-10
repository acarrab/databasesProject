<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/auth.php");

if ( Request::is_post() ) {

  $user = &Request::validate_and_get_data(array("password", "old_password"));
  Auth::update_password($user);
  exit("Account creation successful.");

} else { Error::not_found(); }
?>
