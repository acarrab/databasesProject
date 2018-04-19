<?php
require_once(dirname(__FILE__).'/../tools.php');
Auth::assert_access();

if ( Request::is_post() ) {

  $input = array("vid", "name");
  $in = &Request::validate_and_get_data($input);
  $db = &Database::get_instance();
  $s = &State::get_instance();
  $uid = $s->user->uid;


  $sql = "
SELECT 
";


  $sql = "
SELECT possible_contacts.*, COUNT(*) - SUM(message.receiver_saw) as unread_messages FROM message JOIN

  (SELECT
    user.uid,
    user.f_name,
    user.l_name,
    user.username,
    user.email,
    user.channel,
    if(edges.user_b is null, 0, 1) as is_contact
   FROM user LEFT JOIN
    (SELECT * FROM user JOIN contact on user.uid = contact.user_a WHERE uid = '$uid' ) as edges
   ON user.uid = edges.user_b
 ) as possible_contacts

ON (message.sender = possible_contacts.uid  AND message.receiver = '$uid') AND is_contact = '$in->contacts'

GROUP BY possible_contacts.uid
";



  
  $output = array("");
  Request::validate_and_put_array($data, $output);

} else { Errors::not_found(); }

?>

