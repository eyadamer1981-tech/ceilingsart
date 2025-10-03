<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Project.php';

$database = new Database();
$db = $database->getConnection();

$project = new Project($db);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $project->getCategories();
        $categories = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $categories[] = $row['category'];
        }

        http_response_code(200);
        echo json_encode($categories);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Server error"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>