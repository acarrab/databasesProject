<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("vid", "pid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $is_mine = $db->get_object("
SELECT * FROM playlist WHERE pid='$in->pid' AND owner='$uid'
");
  if (! $is_mine ) {
    Errors::unauthorized();
  }

  $db->exec_query("
DELETE FROM playlist_entry WHERE vid='$in->vid' AND pid='$in->pid'
");

  $output = array();
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }


?>