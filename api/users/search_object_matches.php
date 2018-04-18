<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("searchText");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $searchText = strtolower(trim($in->searchText));

  $uid = $s->user->uid;
  $sql="".
    "SELECT".
    " user.uid,".
    " user.f_name,".
    " user.l_name,".
    " user.username,".
    " user.email,".
    " user.channel,".
    " if(edges.user_b is null, 0, 1) as is_contact ".
    "FROM user LEFT JOIN".
    " (SELECT * FROM user JOIN contact on user.uid = contact.user_a WHERE uid = '$uid' ) as edges ".
    "ON user.uid = edges.user_b ";


  if ($searchText !== '') {
    $sql .= " ".
      "WHERE".
      " lower(user.username) LIKE '$searchText%'".
      " OR lower(user.f_name) LIKE '$searchText%'".
      " OR lower(user.l_name) LIKE '$searchText%'";
  }
  $sql .=" ORDER BY user.username LIMIT 50";

  $users = &$db->get_objects($sql);

  $data = array_map("make_public", $users);

  $output = array("f_name", "l_name", "username", "email", "channel", "is_contact");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }

?>