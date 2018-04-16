<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once(dirname(__FILE__)."/video_selector.php");
require_once($server."/video.php");


if ( Request::is_get() ) {
  $db = &Database::get_instance();
  $sql = video_select("ORDER BY video.upload_date DESC");
  $results = $db->exec_query_get_rows($sql);
  Request::put_data($results);
}
else {
  Errors::not_found();
}

?>
