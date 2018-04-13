<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/auth.php");
require_once($server."/user.php");

if ( Request::is_get() ) {
  UserInterface::get_contacts();
} else { Error::not_found(); }
?>
