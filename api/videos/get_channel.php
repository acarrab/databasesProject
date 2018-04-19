<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("uid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $other = $db->get_object("SELECT channel FROM user WHERE uid='$in->uid'");

  $channel = $db->conn->real_escape_string($other->channel);

  $data = $db->get_objects("
SELECT video.*, IF(fav_id IS NULL, '0', '1') as is_favorite FROM (
  SELECT * FROM video_info
  WHERE channel = '$channel'
  ORDER BY video_info.upload_date DESC
) as video LEFT JOIN favorite
ON favorite.vid=video.vid AND favorite.uid = '$uid'
");



  $output = array("is_favorite", "vid", "username", "f_name", "l_name", "channel", "title", "description", "upload_date", "video_path", "image_path", "last_access", "category");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>