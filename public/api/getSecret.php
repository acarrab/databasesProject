<?php
$server = dirname(__FILE__)."./../../server";
require_once($server."/auth.php");

$auth = new Auth();
$auth->validate();



if ( $_SERVER["REQUEST_METHOD"] == "POST" ) {
  $credentials = json_decode(file_get_contents("php://input"), true);
  header("Content-Type: application/json");
  exit(json_encode($credentials));
} else if ( $_SERVER["REQUEST_METHOD"] == "GET" ) {
  header("Content-Type: application/json");
  exit(json_encode('{ message: "You have access!!!" }'));
}

?>