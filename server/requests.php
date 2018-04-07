<?php

class Errors {
  public static function not_found() { header("HTTP/1.1 404 Not Found"); exit(); }
  public static function unauthorized() { header("HTTP/1.1 401 Unauthorized"); exit(); }
  public static function server_error($err) { header("HTTP/1.1 500 Internal Server Error"); exit($err); }
  public static function not_implemented() { header("HTTP/1.1 501 Not Implemented"); exit(); }
}

class Request {

  public static function is_post() { return $_SERVER["REQUEST_METHOD"] == "POST"; }
  public static function is_get() { return $_SERVER["REQUEST_METHOD"] == "GET"; }




  public static function get_data() {
    return json_decode(file_get_contents("php://input"), true);
  }


  public static function put_data(&$object) {
    header("Content-Type: application/json"); exit(json_encode($object, true));
  }

  public static function validate_and_get_data($needed_fields) {
    $data = Request::get_data();
    foreach ($needed_fields as $field_name) {
      if (!isset($data[$field_name])) {
	Errors::server_error("$field_name does not exist");
      }
    }
    return $data;
  }



  public static function get_json() { return file_get_contents("php://input"); }
  public static function put_json(&$json) { exit($json); }
}




?>