<?php
require_once(dirname(__FILE__).'/../tools.php');

if ( Request::is_post() ) {

  $input = array("username", "password", "email", "f_name", "l_name", "channel");

  $user = &Request::validate_and_get_data($input);
  $data = &Auth::create_account($user);

  $output = array("f_name", "l_name", "username", "email", "channel");
  Request::validate_and_put_data($data, $output);


} else { Errors::not_found(); }


?>