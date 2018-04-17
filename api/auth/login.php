<?php
require_once(dirname(__FILE__).'/../tools.php');

if ( Request::is_post() ) {

  $input = array("username", "password");

  $user = &Request::validate_and_get_data($input);
  $data = &Auth::login($user->username, $user->password);

  $output = array("f_name", "l_name", "username", "email", "channel");
  Request::validate_and_put_data($data, $output);


} else { Errors::not_found(); }


?>