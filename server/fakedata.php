<?php
class VideoData {
  private $img;
  private $title;
  private $summary;
  private $author;
  private $date;
  public function __construct($img, $title, $summary, $author, $date) {
    $this->img = $img;
    $this->title = $title;
    $this->summary = $summary;
    $this->author = $author;
    $this->date = $date;
  }
  public function getVars() {
    return get_object_vars($this);
  }
}





function getFakeData() {
  $img1='public/images/doggo1.jpg';
  $title1='First doggo';
  $img2='public/images/doggo2.jpg';
  $title2='Second doggo';
  $img3='public/images/doggo3.jpg';
  $title3='Third doggo';
  $fakeData=array
    (
     (new VideoData($img1, $title1, 'A test video thumbnail', 'Angelo Carrabba', 'Monday, February 12th, 2018'))->getVars(),
     (new VideoData($img2, $title2, 'A test video thumbnail', 'Daniel Pebbles', 'Tuesday, February 13th, 2018'))->getVars(),
     (new VideoData($img3, $title3, 'A test video thumbnail', 'Lucas Durham', 'Wednesday, February 14th, 2018'))->getVars(),
     (new VideoData($img1, $title1, 'A test video thumbnail', 'Angelo Carrabba', 'Monday, February 12th, 2018'))->getVars(),
     (new VideoData($img2, $title2, 'A test video thumbnail', 'Daniel Pebbles', 'Tuesday, February 13th, 2018'))->getVars(),
     (new VideoData($img3, $title3, 'A test video thumbnail', 'Lucas Durham', 'Wednesday, February 14th, 2018'))->getVars(),
     (new VideoData($img1, $title1, 'A test video thumbnail', 'Angelo Carrabba', 'Monday, February 12th, 2018'))->getVars(),
     (new VideoData($img2, $title2, 'A test video thumbnail', 'Daniel Pebbles', 'Tuesday, February 13th, 2018'))->getVars(),
     (new VideoData($img3, $title3, 'A test video thumbnail', 'Lucas Durham', 'Wednesday, February 14th, 2018'))->getVars(),
     (new VideoData($img1, $title1, 'A test video thumbnail', 'Angelo Carrabba', 'Monday, February 12th, 2018'))->getVars(),
     (new VideoData($img2, $title2, 'A test video thumbnail', 'Daniel Pebbles', 'Tuesday, February 13th, 2018'))->getVars(),
     (new VideoData($img3, $title3, 'A test video thumbnail', 'Lucas Durham', 'Wednesday, February 14th, 2018'))->getVars(),
     (new VideoData($img1, $title1, 'A test video thumbnail', 'Angelo Carrabba', 'Monday, February 12th, 2018'))->getVars(),
     (new VideoData($img2, $title2, 'A test video thumbnail', 'Daniel Pebbles', 'Tuesday, February 13th, 2018'))->getVars(),
     (new VideoData($img3, $title3, 'A test video thumbnail', 'Lucas Durham', 'Wednesday, February 14th, 2018'))->getVars(),
     (new VideoData($img1, $title1, 'A test video thumbnail', 'Angelo Carrabba', 'Monday, February 12th, 2018'))->getVars(),
     (new VideoData($img2, $title2, 'A test video thumbnail', 'Daniel Pebbles', 'Tuesday, February 13th, 2018'))->getVars(),
     (new VideoData($img3, $title3, 'A test video thumbnail', 'Lucas Durham', 'Wednesday, February 14th, 2018'))->getVars(),
     (new VideoData($img1, $title1, 'A test video thumbnail', 'Angelo Carrabba', 'Monday, February 12th, 2018'))->getVars(),
     (new VideoData($img2, $title2, 'A test video thumbnail', 'Daniel Pebbles', 'Tuesday, February 13th, 2018'))->getVars(),
     (new VideoData($img3, $title3, 'A test video thumbnail', 'Lucas Durham', 'Wednesday, February 14th, 2018'))->getVars()
     );
  return $fakeData;
}

?>