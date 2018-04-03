<?php

class Request {

  public static function is_post() { return $_SERVER["REQUEST_METHOD"] == "POST"; }
  public static function is_get() { return $_SERVER["REQUEST_METHOD"] == "GET"; }



  public static function get_data() {
    return json_decode(file_get_contents("php://input"), true);
  }
  public static function put_data(&$object) {
    header("Content-Type: application/json"); exit(json_encode($object, true));
  }

  public static function get_json() { return file_get_contents("php://input"); }
  public static function put_json(&$json) { exit($json); }
}


class Errors {
  public static function not_found() { header("HTTP/1.1 404 Not Found"); exit(); }
  public static function unauthorized() { header("HTTP/1.1 401 Unauthorized"); exit(); }
  public static function server_error($err) { header("HTTP/1.1 500 Internal Server Error"); exit($err); }
}

?>