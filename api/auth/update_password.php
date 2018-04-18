<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("password", "old_password");

  $user = &Request::validate_and_get_data($input);
  $data = Auth::update_password($user->password, $user->old_password);

  $output = array("f_name", "l_name", "username", "email", "channel");
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }

?>