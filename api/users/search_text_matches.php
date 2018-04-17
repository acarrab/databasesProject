<?php
require_once(dirname(__FILE__).'/../tools.php');

if ( Request::is_post() ) {

  $input = array("searchText");
  $in = &Request::validate_and_get_data($input);

  $db = &Database::get_instance();
  $s = &State::get_instance();

  $searchText = strtolower(trim($in->searchText));

  $sql="SELECT username, f_name, l_name FROM user WHERE ".
    "lower(username) LIKE '$searchText%' ".
    "OR lower(f_name) LIKE '$searchText%' ".
    "OR lower(l_name) LIKE '$searchText%' ".
    "ORDER BY username LIMIT 20";

  $results = &$db->get_objects($sql);
  $data = array();

  class TextResult {
    public $text = '';
    public function __construct($text) {
      $this->text = $text;
    }
  }

  foreach ($results as $res) {

    if (strpos(strtolower($res->username), $searchText) !== false) {
      $data[] = new TextResult($res->username); // use username if first match
    }
    else if (strpos(strtolower($res->f_name), $searchText) !== false) {
      $data[] = new TextResult($res->f_name);
    }
    else if (strpos(strtolower($res->l_name), $searchText) !== false) {
      $data[] = new TextResult($res->l_name);
    }
    else {
      $data[] = new TextResult($res->username); // default to username if % was sent
    }
  }


  $output = array("text");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }


?>