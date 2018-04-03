<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/state.php");


if ( Request::is_post() ) {

  $s = &State::get_instance();
  $data = &Request::get_data();
  $s->search->set($data["searchText"]);
  $text = $s->search->get();
  exit( "Search is $text" );

} else { Errors::not_found(); }

?>