<?php
$server = dirname(__FILE__);
require_once($server."/connect.php");
require_once($server."/auth.php");

// $db = new Database();

class User {
  public $uid = null;
  public $f_name = null;
  public $l_name = null;
  public $username = null;
  public $email = null;


  public function __construct($uid, $f_name, $l_name, $username, $email) {
    $this->uid = $uid;
    $this->f_name = $f_name;
    $this->l_name = $l_name;
    $this->username = $username;
    $this->email = $email;
  }
}

class PublicUser {
  public $f_name = null;
  public $l_name = null;
  public $username = null;
  public $email = null;


  public function __construct($user) {
    $this->f_name = $user->f_name;
    $this->l_name = $user->l_name;
    $this->username = $user->username;
    $this->email = $user->email;
  }
}


class UserInterface {
  public static function get_text($searchText) {
    $db = &Database::get_instance();
    $searchText = strtolower(trim($searchText));
    $sql="SELECT username, f_name, l_name FROM user WHERE ".
      "lower(username) LIKE '$searchText%' ".
      "OR lower(f_name) LIKE '$searchText%' ".
      "OR lower(l_name) LIKE '$searchText%' ".
      "ORDER BY username LIMIT 20";
    $suggestions = array();
    if ($results = &$db->exec_query($sql)) {
      while ($row = $results->fetch_object()) {

	if (strpos(strtolower($row->username), $searchText) !== false) {

	  $suggestions[] = $row->username;
	} else if (strpos(strtolower($row->f_name), $searchText) !== false) {
	  $suggestions[] = $row->f_name;
	} else if (strpos(strtolower($row->l_name), $searchText) !== false) {
	  $suggestions[] = $row->l_name;
	} else {
	  $suggestions[] = $row->username; // default to username if % was sent
	}

      }
      $results->close();
    }
    return $suggestions;
  }

  public static function get_objects($searchText) {
    $db = &Database::get_instance();
    $searchText = strtolower(trim($searchText));
    $sql="SELECT * FROM user WHERE ".
      "lower(username) LIKE '$searchText%' ".
      "OR lower(f_name) LIKE '$searchText%' ".
      "OR lower(l_name) LIKE '$searchText%' ".
      "ORDER BY username LIMIT 20";
    $possibleUsers = array();
    if ($results = &$db->exec_query($sql)) {
      while ($user = $results->fetch_object()) {
	$possibleUsers[] = new PublicUser($user);
      }
      $results->close();
    }
    return $possibleUsers;
  }
}

?>