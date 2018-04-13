<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/video.php");

if ( Request::is_post() ) {

  $video = Request::validate_and_get_data(array("title", "data"));
  exit("Success...");
} else { Errors::not_found(); }

?>