<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/video.php");

$data = &Request::validate_and_get_data(array("searchText"));

if ( Request::is_get() ) {

  $s = &State::get_instance();
  $searchText = $s->search->get();
  $videos = &Video::get_info($searchText);
  Request::put_data($videos);

} else { Errors::not_found(); }

?>