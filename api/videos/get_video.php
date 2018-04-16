<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once(dirname(__FILE__)."/video_selector.php");
require_once($server."/video.php");


if ( Request::is_post() ) {
  $s = &State::get_instance();
  $db = &Database::get_instance();
  $vidContainer = Request::validate_and_get_data(array("vid"));
  $vid = $vidContainer->vid;
  $sql = video_select("WHERE video.vid='$vid'");
  $results = $db->exec_query_get_rows($sql);
  Request::put_data($results[0]);
}
else {
  Errors::not_found();
}

?>
