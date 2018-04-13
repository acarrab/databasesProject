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
  public $is_contact = null;

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
  public $is_contact = null;

  public function __construct($user) {
    $this->f_name = $user->f_name;
    $this->l_name = $user->l_name;
    $this->username = $user->username;
    $this->email = $user->email;
    $this->is_contact = $user->is_contact;
  }
}

function make_public($user) { return new PublicUser($user); }


class UserInterface {

  public static function update_relationship($username, $status)  {
    $s = &State::get_instance();
    $db = &Database::get_instance();

    $results = &$db->exec_query("SELECT uid FROM user WHERE username='$username'");
    $row = $results->fetch_object();
    if (!$row) { Errors::bad_request(); }
    $results->close();

    $uid_b = $row->uid;
    $uid_a = $s->user->uid;


    $results = &$db->exec_query("SELECT * FROM contact WHERE user_a='$uid_a' AND user_b='$uid_b'");
    $row = $results->fetch_object();
    $results->close();

    if (!$row && $status === "1") {
      $sql="INSERT INTO contact (user_a, user_b) VALUES ('$uid_a', '$uid_b')";
    }
    else if ($row && $status === "0") {
      $sql="DELETE FROM contact WHERE user_a='$uid_a' AND user_b='$uid_b'";
    } else {
      return;
    }
    $db->exec_query($sql);
  }


  public static function get_text($searchText) {
    $s = &State::get_instance();
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
    $s = &State::get_instance();
    $db = &Database::get_instance();
    $searchText = strtolower(trim($searchText));
    $uid = $s->user->uid;
    $sql="".
      "SELECT".
      " user.uid,".
      " user.f_name,".
      " user.l_name,".
      " user.username,".
      " user.email,".
      " if(edges.user_b is null, 0, 1) as is_contact ".
      "FROM user LEFT JOIN".
      " (SELECT * FROM user JOIN contact on user.uid = contact.user_a WHERE uid = '$uid' ) as edges ".
      "ON user.uid = edges.user_b ";


    if ($searchText !== '') {
      $sql .= " ".
      "WHERE".
	" lower(user.username) LIKE '$searchText%'".
	" OR lower(user.f_name) LIKE '$searchText%'".
	" OR lower(user.l_name) LIKE '$searchText%'";
    }
    $sql .=" ORDER BY user.username LIMIT 50";

    $possibleUsers = &$db->exec_query_get_rows($sql);

    $objects = array_map("make_public", $possibleUsers);
    return $possibleUsers;
  }

  public static function get_contacts() {
    $s = &State::get_instance();
    $db = &Database::get_instance();
    $uid = $s->user->uid;
    $sql="SELECT".
      " user.uid,".
      " user.f_name,".
      " user.l_name,".
      " user.username,".
      " user.email".
      " FROM user JOIN".
      " (SELECT * FROM user JOIN contact on user.uid = contact.user_a WHERE uid='$uid' ) as edges ".
      "ON user.uid = edges.user_b ";

    $users = $db->exec_query_get_rows($sql);
    $objects = array_map("make_public", $users);
    Request::put_data($objects);
  }

}

?>