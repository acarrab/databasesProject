<?php
require_once(dirname(__FILE__)."/../tools.php");
require_once($server."/video.php");
require_once(dirname(__FILE__)."/user.php");

//State & Database Instances
$s = &State::get_instance();
$db = &Database::get_instance();
  
$username = $s->user->username;
$uid = $s->user->uid;
$channel = $s->user->channel;

if ( Request::is_post() ) {
  $video = Request::validate_and_get_data(array("title", "summary", "category"));

  //Create Directory if doesn't exist
  if(!file_exists('uploads/')) { 
    mkdir('uploads/', 0757); 
  }

  $dirfile = 'uploads/'.$username.'/';
  if(!file_exists($dirfile)) {
    mkdir($dirfile,0755);
    chmod( $dirfile,0755); 
  }
  // Insert data into the video table
  $insert = "insert into video(uid, title, summary, date, channel, path, lastAccessTime, category) values".
            "('$uid', '$video->title', '$video->summary', NOW(), '$channel', 'uploads/'.$username.'/', NOW(), '$video->category')";
  $db->exec_query($insert);

  // Get the auto-incremented vid
  $vid = Request::validate_and_get_data(array("vid"));

  // Set the path to "uploads/username/vid"
  $vid = Request::validate_and_get_data(array("vid"));
  $path = "update video set path=CONCAT(path,$vid) WHERE vid = $vid->vid";    
}
else {
  Errors::not_found();
}	

?>



