<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();


if ( Request::is_get() ) {

  $input = array();
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $sql = "
SELECT *, 0 as unread_messages, -1 as is_contact FROM
(
  SELECT
    user.uid,
    user.f_name,
    user.l_name,
    user.username,
    user.email,
    user.channel,
    SUM(is_receiver) as received,
    SUM(is_sender) as sent,
    send_recv.*

  FROM user JOIN

  (SELECT IF(sender='$uid', 1, 0) as is_sender, IF(receiver='$uid', 1, 0) as is_receiver, IF(receiver='$uid', sender, receiver) as other FROM message JOIN user ON
    (message.receiver = '$uid' AND  message.sender = user.uid)
  OR
    (message.receiver = user.uid AND  message.sender = '$uid')
  ) as send_recv

ON send_recv.other = user.uid

GROUP BY user.uid

) as messages

WHERE sent>0 AND received = 0
";

  $data = $db->get_objects($sql);

  $output = array("unread_messages", "f_name", "l_name", "username", "channel", "uid", "is_contact");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>