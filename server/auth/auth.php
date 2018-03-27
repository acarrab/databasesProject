<?php


function authenticate() {
  session_start();
  if (!isset($_SESSION["username"]) ) {
    // if you do not have access, then the page does not exist
    // this is more secure since users
    header("HTTP/1.1 404 Not Found");
    exit;
  }
}




?>