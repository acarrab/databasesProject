<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_get() ) {

  $input = array();
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $playlist_id = null;
  // step 1: get the playlist's id.
  $playlists = $db->get_objects("
SELECT pid, name FROM playlist WHERE owner='$uid'
");

  $output = array("pid", "name");
  Request::validate_and_put_array($playlists, $output);

} else { Errors::not_found(); }


?>