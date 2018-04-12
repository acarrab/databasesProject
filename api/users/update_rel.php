<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/auth.php");
require_once($server."/user.php");

if ( Request::is_post() ) {
  $fields = &Request::validate_and_get_data(array("username", "status"));

  UserInterface::update_relationship($fields->username, $fields->status);

  exit("Change successful.");
} else { Error::not_found(); }
?>
