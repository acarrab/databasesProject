<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("vid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();

  $vid = $in->vid;
  $data = $db->get_object(video_select("WHERE video.vid='$vid' ORDER BY video.upload_date DESC"));

  $output = array("vid", "username", "f_name", "l_name", "channel", "title", "description", "upload_date", "video_path", "image_path", "last_access", "category");
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }


?>