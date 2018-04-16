<?php
require_once(dirname(__FILE__)."/../tools.php");

require_once($server."/video.php");
require_once($vendor."/autoload.php");

if ( Request::is_post() ) {
  $valid_fields = array("title",
			"description",
			"keywords",
			"category",
			"extension");

  $video = &Request::validate_and_get_post($valid_fields);

  $exact = realpath($server . "/..");

  // paths that the user must reference
  $upload_serve = 'public/uploads';
  $video_serve = $upload_serve . '/videos';
  $image_serve = $upload_serve . '/images';

  // exact paths
  $upload_exact = $exact .'/'. $upload_serve;
  $video_exact = $exact .'/'. $video_serve;
  $image_exact = $exact .'/'. $image_serve;


  // create all needed directories
  if (!file_exists($upload_exact)) { mkdir($upload_exact, 0755); }
  if (!file_exists($video_exact)) { mkdir($video_exact, 0755); }
  if (!file_exists($image_exact)) { mkdir($image_exact, 0755); }


  $s = &State::get_instance();
  $db = &Database::get_instance();

  $username = $s->user->username;
  $uid = $s->user->uid;
  $channel = $s->user->channel;

  // Insert data into the video table
  $sql = "INSERT INTO video ".
    "(vid, uid, title, description, upload_date, video_path, image_path, last_access, category) VALUES ".
    "(NULL, '$uid', '$video->title', '$video->description', NOW(), ".
    "'$video_serve', '$image_serve', NOW(), '$video->category')";


  $res = &$db->conn->query($sql); // this validates result already
  $vid = "".$db->conn->insert_id; // for some reason "". makes vid exist...

  $video_name = $vid . '.' . $video->extension;
  $image_name = $vid . '.jpg';

  $video_file_serve = $video_serve . '/' . $video_name;
  $image_file_serve = $image_serve . '/' . $image_name;

  $video_file_exact = $video_exact . '/' . $video_name;
  $image_file_exact = $image_exact . '/' . $image_name;

  /* update the video paths **************************************************/
  $db->exec_query("UPDATE video SET ".
		  "video_path='$video_file_serve', ".
		  "image_path='$image_file_serve' ".
		  "WHERE vid='$vid'");


  /* write the video file ****************************************************/
  move_uploaded_file($_FILES["file"]["tmp_name"], $video_file_exact);

  /* add in the thumbnail ****************************************************/
  $ffmpeg = FFMpeg\FFMpeg::create();
  $video_xformer = $ffmpeg->open($video_file_exact);
  $video_xformer
    ->frame(FFMpeg\Coordinate\TimeCode::fromSeconds(.5))
    ->save($image_file_exact);



  /* add the keywords ********************************************************/
  $keywords = trim($video->keywords);
  $keywordsArr = preg_split('/\s+/', $keywords);

  foreach ($keywordsArr as $keyword) {
    $word = strtolower($keyword);
    $sql = "INSERT INTO keyword (vid, word) VALUES ('$vid', '$word')";
    $db->exec_query($sql);
  }

  exit("successful");
}
else {
  Errors::not_found();
}

?>
