<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();


if ( Request::is_post() ) {

  $input = array("text", "uid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $text = $db->conn->real_escape_string($in->text);

  $sql = "INSERT INTO message (sender, receiver, message, send_time) VALUES ('$uid', '$in->uid', '$text', NOW())";
  $db->exec_query($sql);

  $output = array();
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }


?>