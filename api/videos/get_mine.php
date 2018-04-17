<?php
require_once(dirname(__FILE__).'/../tools.php');

if ( Request::is_get() ) {

  $input = array();
  $user = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;


  $data = $db->get_objects(video_select("WHERE user.uid='$uid' ORDER BY video.upload_date DESC"));

  //  Request::put_data($data);

  $output = array("vid", "username", "f_name", "l_name", "channel", "title", "description", "upload_date", "video_path", "image_path", "last_access", "category");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>