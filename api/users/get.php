<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("uid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

    $sql="
SELECT
 user.uid,
 user.f_name,
 user.l_name,
 user.username,
 user.email,
 user.channel,
 if(edges.user_b is null, 0, 1) as is_contact
FROM user LEFT JOIN
 (SELECT * FROM user JOIN contact on user.uid = contact.user_a WHERE uid = '$uid' ) as edges
ON user.uid = edges.user_b
WHERE user.uid = '$in->uid'
";

  $data = $db->get_object($sql);

  $output = array("uid", "f_name", "l_name", "username", "channel", "is_contact");
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }

?>