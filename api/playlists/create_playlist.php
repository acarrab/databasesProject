<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("name");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $playlist_id = null;
  // step 1: get the playlist's id.
  $playlist = $db->get_object("
SELECT * FROM playlist WHERE owner='$uid' AND name='$in->name'
");

  if ($playlist) {
    $playlist_id = $playlist->pid;
  } else {
    $db->exec_query("
INSERT INTO playlist (owner, name) VALUES ('$uid', '$in->name')
");
    $playlist_id = "". $db->conn->insert_id;
  }


  $output = array();
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }


?>