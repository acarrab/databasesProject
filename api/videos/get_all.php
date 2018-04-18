<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_get() ) {

  $input = array();
  $user = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();

  $data = $db->get_objects(video_select("ORDER BY video.upload_date DESC"));


  $output = array("vid", "username", "f_name", "l_name", "channel", "title", "description", "upload_date", "video_path", "image_path", "last_access", "category");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>