<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/auth.php");

if ( Request::is_post() ) {
  Auth::create_account(&Request::get_data());
  exit("Account creation successful.");

} else { Error::not_found(); }
?>