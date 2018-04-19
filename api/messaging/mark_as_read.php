<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();


if ( Request::is_post() ) {

  $input = array("uid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $sql = "UPDATE message SET message.receiver_saw='1' WHERE message.sender='$in->uid' AND message.receiver='$uid'";
  $db->exec_query($sql);

  $output = array();
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }


?>