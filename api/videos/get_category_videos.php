<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once(dirname(__FILE__)."/video_selector.php");
require_once($server."/video.php");


if ( Request::is_post() ) {
  $s = &State::get_instance();
  $db = &Database::get_instance();
  $category_data = &Request::validate_and_get_data(array("category"));
  $category = $category_data->category;
  $uid = $s->user->uid;
  $sql = video_select("WHERE category='$category'");
  $results = $db->exec_query_get_rows($sql);
  Request::put_data($results);
}
else {
  Errors::not_found();
}

?>
