<?php
ini_set('display_errors', '0');
/*****************************************************************************/
/*                        General use methods for api                        */
/*****************************************************************************/

$api = dirname(__FILE__);
$tools = $api . '/tools';

require_once($tools . '/users.php');
require_once($tools . '/video.php');
require_once($tools . '/connect.php');
require_once($tools . '/auth.php');
require_once($tools . '/state.php');
require_once($tools . '/requests.php');


?>