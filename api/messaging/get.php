<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();


if ( Request::is_post() ) {

  $input = array("uid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $sql = "
SELECT message.* FROM message WHERE
(message.sender='$in->uid' AND message.receiver='$uid')
OR
(message.sender='$uid' AND message.receiver='$in->uid')
ORDER BY send_time
";
  $data = $db->get_objects($sql);

  $output = array("sender", "receiver", "message", "send_time");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>