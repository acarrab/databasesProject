<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("searchText");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();

  $searchText = strtolower($in->searchText);

  $sql = "SELECT result.*, user.username, user.f_name, user.l_name, user.email, user.channel FROM user JOIN ".
    "(SELECT video.*, keyword.word FROM keyword JOIN video on video.vid = keyword.vid WHERE word LIKE '$searchText%') as result ".
    "ON user.uid = result.uid";

  $data = $db->get_objects($sql);
  $output = array("vid", "username", "f_name", "l_name", "channel", "title", "description", "upload_date", "video_path", "image_path", "last_access", "category", "word");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>