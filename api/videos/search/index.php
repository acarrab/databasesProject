<?php
require_once(dirname(__FILE__)."/../../state.php");

if ( $_SERVER["REQUEST_METHOD"] == "POST" ) {
  $state = &getState();
  $data = json_decode(file_get_contents("php://input"), true);
  $state->setSearch($data["searchText"]);
  exit(json_encode($state->getSearch()));
}

?>