<?php
require_once(dirname(__FILE__)."/../../tools.php");
require_once($server."/user.php");


if ( Request::is_post() ) {

  $data = Request::validate_and_get_data(array("searchText"));
  $result = &UserInterface::get_objects($data->searchText);
  Request::put_data($result);

} else { Errors::not_found(); }

?>