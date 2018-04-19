<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();


if ( Request::is_get() ) {

  $input = array();
  $user = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $sql = "SELECT count(*) as unread_messages FROM message WHERE message.receiver = '$uid' AND message.receiver_saw = '0'";

  $data = $db->get_object($sql);

  $output = array("unread_messages");
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }


?>