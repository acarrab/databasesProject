<?php
$server = dirname(__FILE__)."./../../../server";
require_once($server."/auth.php");

$auth = new Auth();
$auth->logout();

?>