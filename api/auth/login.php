<?php

require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/auth.php");

if ( Request::is_post() ) {

  $data = Request::get_data();
  Auth::login($data["username"], $data["password"]);

} else { Errors::not_found(); }

?>