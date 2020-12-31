<?php

require_once "utility.php";

header("Content-type: application/json");

$requestURL = $_SERVER["REQUEST_URI"];

if(preg_match("/userTest$/", $requestURL)) {
    userTest();
} elseif(preg_match("/userTestFrontEnd$/", $requestURL)) {
    userTestFrontEnd();
} else {
    echo json_encode(["error" => "URL not found"]);
}

function userTest() {
    $incomingContentType = $_SERVER['CONTENT_TYPE'];
    if ($incomingContentType != 'application/json') {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 INTERNAL SERVER ERROR ');
        exit();
    }

    $content = trim(file_get_contents("php://input"));
    $data = json_decode($content, true);

    $username = $data["username"];
    $name = $data["name"];

    if (!$username) {
        $errors = 'Username is required';
        $response = ["success" => false, "message" => $errors];
    }

    if (!$name) {
        $errors = 'Name is required';
        $response = ["success" => false, "message" => $errors];
    }

    if (!$username && !$name) {
        $errors = 'Username and name are required';
        $response = ["success" => false, "message" => $errors];
    }

    if ($username && $name) {
        $message[] = 'Inserted ' . $username . ' with name ' . $name;
        $response = ["success" => true, "message" => $message];
    }
    
    echo json_encode($response);
}

function userTestFrontEnd() {

    if ($_POST) {
        $data = json_decode($_POST["data"], true);

        $username = isset($data["username"]) ? testInput($data["username"]) : "";
        $name = isset($data["name"]) ? testInput($data["name"]) : "";

        if (!$username) {
            $message = 'Username is required';
            $response = ["success" => false, "message" => $message];
        }

        if (!$name) {
            $message = 'Name is required';
            $response = ["success" => false, "message" => $message];
        }

        if (!$username && !$name) {
            $message = 'Username and name are required';
            $response = ["success" => false, "message" => $message];
        }

        if ($username && $name) {
            $message = 'Inserted ' . $username . ' with name ' . $name;
            $response = ["success" => true, "message" => $message];
        } 
    } else {
        $message= 'Невалидна заявка';
        $response = ["success" => false, "message" => $message];
    }
    
    echo json_encode($response);
}