<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("searchText");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $searchText = $db->conn->real_escape_string(strtolower($in->searchText));

  $data = $db->get_objects("
SELECT DISTINCT user.channel
FROM user JOIN video ON video.uid = user.uid
WHERE LOWER(channel) LIKE '$searchText%'
");

  $output = array("channel");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>