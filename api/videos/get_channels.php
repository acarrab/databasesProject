<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_get() ) {

  $input = array();
  $user = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();

  $category = $user->category;

  $data = $db->get_objects("
SELECT user.uid, channel, username, COUNT(*) as video_count
FROM user JOIN video ON video.uid = user.uid GROUP BY user.uid
ORDER BY RAND()
");

  $output = array("uid", "channel", "username", "video_count");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>