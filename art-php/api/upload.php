<?php
require_once 'config/cors.php';
require_once 'utils/jwt.php';
require_once 'utils/upload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Verify authentication
        JWTUtil::requireAuth();

        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(array("message" => "No file uploaded. Field name should be 'image'."));
            exit;
        }

        $filename = UploadUtil::uploadFile($_FILES['image'], 'upload_');

        http_response_code(201);
        echo json_encode(array(
            "id" => uniqid(),
            "filename" => $filename,
            "url" => UploadUtil::getFileUrl($filename)
        ));
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Upload failed: " . $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>