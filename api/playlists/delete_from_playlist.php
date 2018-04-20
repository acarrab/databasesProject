<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("name", "vid");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $playlist_id = null;
  // step 1: get the playlist's id.
  $playlist = $db->get_object("
SELECT * FROM playlist WHERE name='$in->name' AND owner='$uid'
");

  $db->exec_query("
DELETE FROM playlist_entry WHERE vid='$in->vid' AND pid='$playlist->pid'
");

  $output = array();
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>