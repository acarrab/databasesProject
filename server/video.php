<?php

require_once(dirname(__FILE__)."/fakedata.php");


class Video {
  // this should be done in sql code
  private static function get_data_reduced($searchText) {
    $fakeData = &getFakeData();
    if ( strlen($searchText) > 0 ) {
      $fakeData = array_filter($fakeData, function ($video) use ($searchText) {
	  return stripos($video["title"], $searchText) !== false;
	});
    }
    return array_values($fakeData);
  }



  // returns an array of video summary information
  public static function get_info($searchText) {
    $fakeData = &self::get_data_reduced($searchText);
    return $fakeData;
  }

  public static function get_titles($searchText) {
    $fakeData = &self::get_data_reduced($searchText);
    return array_map(function ($video) { return $video->title; }, $fakeData);
  }

  public static function get_video($video_id) {
    // undefined
  }

}

?>