<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Admin.php';
require_once '../utils/jwt.php';

$database = new Database();
$db = $database->getConnection();

$admin = new Admin($db);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents("php://input"));

    if (!empty($json->email) && !empty($json->password)) {
        if ($admin->login($json->email, $json->password)) {
            $token = JWTUtil::generateToken($admin->id, $admin->email);

            http_response_code(200);
            echo json_encode(array(
                "token" => $token,
                "admin" => array(
                    "id" => $admin->id,
                    "email" => $admin->email
                )
            ));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Invalid credentials"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Email and password are required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>