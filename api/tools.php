<?php
ini_set('display_errors', '0');
/*****************************************************************************/
/*                        General use methods for api                        */
/*****************************************************************************/

$server = dirname(__FILE__)."/../server";
$api = dirname(__FILE__);

require_once($server."/connect.php");
require_once($server."/requests.php");
require_once($server."/state.php");

?>
