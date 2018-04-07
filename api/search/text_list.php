<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/video.php");


if ( Request::is_post() ) {

  $data = Request::validate_and_get_data(array("searchText"));
  $result =  &VideoInterface::get_titles($data["searchText"]);
  Request::put_data($result);

} else { Errors::not_found(); }

?>