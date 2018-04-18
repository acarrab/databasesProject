<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("com_id");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;

  $db->exec_query("DELETE FROM comment WHERE commenter='$uid' AND com_id='$in->com_id'");

  $data = new stdClass();
  $data->deleted = "".$db->conn->affected_rows;

  $output = array("deleted");
  Request::validate_and_put_data($data, $output);

} else { Errors::not_found(); }


?>