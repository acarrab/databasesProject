<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("name");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  // step 1: get the playlist's id.
  $playlist = $db->get_object("
DELETE FROM playlist WHERE owner='$uid' AND name='$in->name'
");

  $output = array();
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>