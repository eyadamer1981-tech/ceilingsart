<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Blog.php';
require_once '../utils/upload.php';

$database = new Database();
$db = $database->getConnection();

$blog = new Blog($db);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $blog->getFeatured();
        $blogs = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $blog_item = array(
                "_id" => $id,
                "id" => $id,
                "title" => $title,
                "content" => $content,
                "excerpt" => $excerpt,
                "image" => $main_image_path ? UploadUtil::getFileUrl($main_image_path) : null,
                "author" => $author,
                "featured" => (bool) $featured,
                "createdAt" => $created_at
            );

            $blogs[] = $blog_item;
        }

        http_response_code(200);
        echo json_encode($blogs);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Server error"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>