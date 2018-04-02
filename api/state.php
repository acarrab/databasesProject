<?php
/*
  maintains the state of the application. Should not rely on Auth.

 */
class State {
  public $searchText;
  public function __construct() { $this->searchText = ''; }
  public function setSearch($text) { $this->searchText = $text; }
  public function getSearch() { return $this->searchText; }
}
function getState() {
  session_start();
  if (!isset($_SESSION["state"])) {
    $_SESSION["state"] = new State();
  }
  return $_SESSION["state"];
}

?>