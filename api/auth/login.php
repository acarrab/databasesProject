<?php

require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/auth.php");

$required_fields=array("username", "password");



if ( Request::is_post() ) {

  $data = Request::validate_and_get_data($required_fields);
  Auth::login($data["username"], $data["password"]);

} else { Errors::not_found(); }

?>