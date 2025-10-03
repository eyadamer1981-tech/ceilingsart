<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Blog.php';
require_once '../utils/jwt.php';
require_once '../utils/upload.php';

$database = new Database();
$db = $database->getConnection();

$blog = new Blog($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $stmt = $blog->read();
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
        break;

    case 'POST':
        try {
            // Verify authentication
            JWTUtil::requireAuth();

            // Check if we already have 8 blogs
            if ($blog->getCount() >= 8) {
                http_response_code(400);
                echo json_encode(array("message" => "Maximum of 8 blogs reached. Please delete an old blog to create a new one."));
                exit;
            }

            // Get form data
            $title = $_POST['title'] ?? '';
            $content = $_POST['content'] ?? '';
            $excerpt = $_POST['excerpt'] ?? '';
            $author = $_POST['author'] ?? '';
            $featured = $_POST['featured'] ?? 'false';

            // Validate required fields
            if (empty($title) || empty($content) || empty($excerpt) || empty($author)) {
                http_response_code(400);
                echo json_encode(array("message" => "Missing required fields"));
                exit;
            }

            // Handle main image upload
            $main_image_path = '';
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $main_image_path = UploadUtil::uploadFile($_FILES['image'], 'blogs', $title, false);
            } elseif (isset($_POST['imageBase64']) && !empty($_POST['imageBase64'])) {
                $main_image_path = UploadUtil::base64ToFile($_POST['imageBase64'], 'blogs', $title, false);
            }

            if (empty($main_image_path)) {
                http_response_code(400);
                echo json_encode(array("message" => "Image is required"));
                exit;
            }

            // Create blog
            $blog->title = $title;
            $blog->content = $content;
            $blog->excerpt = $excerpt;
            $blog->author = $author;
            $blog->main_image_path = $main_image_path;
            $blog->featured = ($featured === 'true');

            if ($blog->create()) {
                http_response_code(201);
                echo json_encode(array(
                    "_id" => $blog->id,
                    "id" => $blog->id,
                    "title" => $blog->title,
                    "content" => $blog->content,
                    "excerpt" => $blog->excerpt,
                    "image" => UploadUtil::getFileUrl($blog->main_image_path),
                    "author" => $blog->author,
                    "featured" => $blog->featured,
                    "message" => "Blog created successfully"
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to create blog"));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error: " . $e->getMessage()));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>