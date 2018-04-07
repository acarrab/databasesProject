<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/auth.php");

if ( Request::is_post() ) {

  $data = &Request::validate_and_get_data(array());
  Auth::create_account($data);
  exit("Account creation successful.");

} else { Error::not_found(); }
?>