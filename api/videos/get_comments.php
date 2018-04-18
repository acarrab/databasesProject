<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("vid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;
  $sql = "SELECT uid, vid, com_id, f_name, l_name, username, channel, text, submit_time FROM user join comment ".
    "WHERE user.uid = comment.commenter AND vid = '$in->vid'";

  $data = $db->get_objects($sql);

  $output = array("uid", "vid", "com_id", "f_name", "l_name", "username", "channel", "text", "submit_time");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>