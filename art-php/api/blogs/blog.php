<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Blog.php';
require_once '../utils/jwt.php';
require_once '../utils/upload.php';

$database = new Database();
$db = $database->getConnection();

$blog = new Blog($db);

// Get blog ID from URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid blog ID"));
    exit;
}

$blog->id = $id;

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            if ($blog->readOne()) {
                $blog_item = array(
                    "_id" => $blog->id,
                    "id" => $blog->id,
                    "title" => $blog->title,
                    "content" => $blog->content,
                    "excerpt" => $blog->excerpt,
                    "image" => $blog->main_image_path ? UploadUtil::getFileUrl($blog->main_image_path) : null,
                    "author" => $blog->author,
                    "featured" => (bool) $blog->featured,
                    "createdAt" => $blog->created_at
                );

                http_response_code(200);
                echo json_encode($blog_item);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Blog not found"));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error"));
        }
        break;

    case 'PUT':
        try {
            // Verify authentication
            JWTUtil::requireAuth();

            $json = json_decode(file_get_contents("php://input"));

            $blog->title = $json->title ?? '';
            $blog->content = $json->content ?? '';
            $blog->excerpt = $json->excerpt ?? '';
            $blog->author = $json->author ?? '';
            $blog->featured = $json->featured ?? false;

            // Keep existing image if not provided
            if (!$blog->readOne()) {
                http_response_code(404);
                echo json_encode(array("message" => "Blog not found"));
                exit;
            }

            if ($blog->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Blog updated successfully"));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to update blog"));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error"));
        }
        break;

    case 'DELETE':
        try {
            // Verify authentication
            JWTUtil::requireAuth();

            if ($blog->readOne()) {
                // Delete image from filesystem
                if ($blog->main_image_path) {
                    UploadUtil::deleteFile($blog->main_image_path);
                }

                // Delete from database
                if ($blog->delete()) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Blog deleted successfully"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Failed to delete blog"));
                }
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Blog not found"));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error"));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>