<?php

class Errors {
  public static function not_found() { header("HTTP/1.1 404 Not Found"); exit(); }
  public static function unauthorized() { header("HTTP/1.1 401 Unauthorized"); exit(); }
  public static function server_error($err) { header("HTTP/1.1 500 Internal Server Error"); exit($err); }
  public static function not_implemented($err) { header("HTTP/1.1 501 Not Implemented"); exit($err); }
  public static function bad_request() { header("HTTP/1.1 400 Bad Request"); exit(); }
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

  public static function validate_and_put_data($data, $needed_fields) {
    $data = (array)$data;
    $db = &Database::get_instance();

    foreach ($needed_fields as $field_name) {
      if (!isset($data[$field_name])) {
	Errors::not_implemented("$field_name does not exist");
      } else {
	$data[$field_name] = $db->conn->real_escape_string($data[$field_name]);
      }
    }
    self::put_data($data);
  }
  public static function validate_and_put_array($data, $needed_fields) {
    $test = (array)$data[0];

    if (!isset($data[0])) {
      self::put_data($data); // send empty array
    }
    foreach ($needed_fields as $field_name) {
      if (!isset($test[$field_name])) {
	Errors::not_implemented("$field_name does not exist");
      }
    }
    self::put_data($data);
  }

  public static function validate_and_get_data($needed_fields) {
    $data = Request::get_data();
    $db = &Database::get_instance();
    foreach ($needed_fields as $field_name) {
      if (!isset($data[$field_name])) {
	Errors::bad_request("$field_name does not exist");
      }
      if (strlen(trim($data[$field_name])) === 0) {
	Errors::bad_request("$field_name is of length 0 when trimmed");
      } else {
	$data[$field_name] = $db->conn->real_escape_string($data[$field_name]);
      }
    }
    return (object)$data;
  }

  public static function validate_and_get_post($needed_fields) {
    $data = $_POST;
    $db = &Database::get_instance();
    foreach ($needed_fields as $field_name) {
      if (!isset($data[$field_name])) {
	Errors::bad_request("$field_name does not exist");
      }
      if (strlen(trim($data[$field_name])) === 0) {
	Errors::bad_request("$field_name is of length 0 when trimmed");
      } else {
	$data[$field_name] = $db->conn->real_escape_string($data[$field_name]);
      }
    }
    return (object)$data;
  }
}

?>