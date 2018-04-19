<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("searchText");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $searchText = $db->conn->real_escape_string(strtolower($in->searchText));

  $sql = "SELECT video.*, keyword.word FROM video_with_favorite as video
JOIN keyword on video.vid = keyword.vid
WHERE uid='$uid' AND word LIKE '$searchText%';";

  $data = $db->get_objects($sql);
  $output = array("is_favorite", "vid", "username", "f_name", "l_name", "channel", "title", "description", "upload_date", "video_path", "image_path", "last_access", "category", "word");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>