<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_get() ) {

  $input = array();
  $user = &Request::validate_and_get_data($input);


  $s = &State::get_instance();
  $data = new PublicUser($s->user);

  $output = array("f_name", "l_name", "username", "email", "channel");
  Request::validate_and_put_data($data, $output);


} else { Errors::not_found(); }


?>