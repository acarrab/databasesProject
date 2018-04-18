<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("vid", "text");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $db->exec_query("INSERT INTO comment (vid, commenter, text, submit_time) VALUES ('$in->vid', '$uid', '$in->text', NOW())");

  $output = array();
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>