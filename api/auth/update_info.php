<?php
require_once(dirname(__FILE__).'/../tools.php');

if ( Request::is_post() ) {

  $input = array("f_name", "l_name", "username", "email", "channel");

  $user = &Request::validate_and_get_data($input);
  $data = Auth::update_account($user);

  $output = array("f_name", "l_name", "username", "email", "channel");
  Request::validate_and_put_data($data, $output);


} else { Errors::not_found(); }


?>