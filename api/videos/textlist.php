<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/video.php");


if ( Request::is_get() ) {

  $s = &State::get_instance();
  Request::put_data(&VideoInterface::get_titles($s->search->get());

} else { Errors::not_found(); }

?>