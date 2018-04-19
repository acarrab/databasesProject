<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("vid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;


  $db->exec_query("DELETE FROM favorite WHERE vid='$in->vid'");

  $output = array();
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>