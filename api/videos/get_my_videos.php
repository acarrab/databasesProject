<?php
require_once(dirname(__FILE__)."/../tools.php");

require_once($server."/video.php");


if ( Request::is_get() ) {
  $s = &State::get_instance();
  $db = &Database::get_instance();
  $uid = $s->user->uid;
  $sql = "SELECT title, description, upload_date, video_path, image_path, last_access, category FROM video WHERE uid='$uid'";
  $results = $db->exec_query_get_rows($sql);
  Request::put_data($results);
}
else {
  Errors::not_found();
}

?>
