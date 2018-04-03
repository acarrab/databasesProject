<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/video.php");


if ( Request::is_get() ) {

  $s = &State::get_instance();
  $searchText = $s->search->get();
  $videos = &Video::get_info($searchText);
  Request::put_data($videos);

} else { Errors::not_found(); }

?>