<?php

function video_select($additional) {
  return "SELECT ".
    "vid, ".
    "username, ".
    "f_name, ".
    "l_name, ".
    "channel, ".
    "title, ".
    "description, ".
    "upload_date, ".
    "video_path, ".
    "image_path, ".
    "last_access, ".
    "category ".
    "FROM user JOIN video ON user.uid = video.uid ".
    $additional;
}

?>