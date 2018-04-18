<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("username", "status");
  $user = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();

  $username = $user->username;
  $status = $user->status;



  $other = &$db->get_object("SELECT uid FROM user WHERE username='$username'"); // get others username
  if (!$other) {
    Request::bad_request();
  }

  $uid_a = $s->user->uid;
  $uid_b = $other->uid;

  $old_relationship = &$db->get_object("SELECT * FROM contact WHERE user_a='$uid_a' AND user_b='$uid_b'");

  if (!$old_relationship && $status === "1") {
    $db->exec_query("INSERT INTO contact (user_a, user_b) VALUES ('$uid_a', '$uid_b')");
  } else if ($old_relationship && $status === "0") {
    $db->exec_query("DELETE FROM contact WHERE user_a='$uid_a' AND user_b='$uid_b'");
  }

  $output = array();
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }


?>