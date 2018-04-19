<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_get() ) {

  $input = array();
  $user = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $sql = "SELECT user.uid, user.f_name, user.l_name, user.username, user.email, user.channel, '1' as is_contact FROM ".
    "user JOIN (SELECT * FROM user JOIN contact on user.uid = contact.user_a WHERE uid='$uid' ) as edges ".
    "ON user.uid = edges.user_b";
  $data = $db->get_objects($sql);


  $output = array("uid", "f_name", "l_name", "username", "email", "channel", "is_contact");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>