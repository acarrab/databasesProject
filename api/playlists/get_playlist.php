<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("pid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $playlist_id = null;
  // step 1: get the playlist's id.
  $playlists = $db->get_objects("
SELECT video.*, IF(fav_id IS NULL, '0', '1') as is_favorite FROM favorite RIGHT JOIN
(
  SELECT video.* from video_info as video JOIN playlist_entry
  ON playlist_entry.vid = video.vid AND playlist_entry.pid='$in->pid'
  ORDER BY video.upload_date DESC
) as video
ON video.vid = favorite.vid AND favorite.uid='$uid'
");

  $output = array("vid", "username", "f_name", "l_name", "channel", "title", "description", "upload_date", "video_path", "image_path", "last_access", "category", "is_favorite");
  Request::validate_and_put_array($playlists, $output);

} else { Errors::not_found(); }


?>