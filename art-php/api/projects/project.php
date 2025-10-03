<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Project.php';
require_once '../utils/jwt.php';
require_once '../utils/upload.php';

$database = new Database();
$db = $database->getConnection();

$project = new Project($db);

// Get project ID from URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid project ID"));
    exit;
}

$project->id = $id;

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            if ($project->readOne()) {
                // Get detail images
                $detail_stmt = $project->getDetailImages();
                $detail_images = array();

                while ($detail_row = $detail_stmt->fetch(PDO::FETCH_ASSOC)) {
                    $detail_images[] = UploadUtil::getFileUrl($detail_row['image_path']);
                }

                $project_item = array(
                    "_id" => $project->id,
                    "id" => $project->id,
                    "title" => $project->title,
                    "descriptionEn" => $project->description_en,
                    "descriptionAr" => $project->description_ar,
                    "category" => $project->category,
                    "image" => $project->main_image_path ? UploadUtil::getFileUrl($project->main_image_path) : null,
                    "detailImages" => $detail_images,
                    "featured" => (bool) $project->featured,
                    "createdAt" => $project->created_at
                );

                http_response_code(200);
                echo json_encode($project_item);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Project not found"));
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

            $project->title = $json->title ?? '';
            $project->description_en = $json->descriptionEn ?? '';
            $project->description_ar = $json->descriptionAr ?? '';
            $project->category = $json->category ?? '';
            $project->featured = $json->featured ?? false;

            // Keep existing image if not provided
            if (!$project->readOne()) {
                http_response_code(404);
                echo json_encode(array("message" => "Project not found"));
                exit;
            }

            if ($project->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Project updated successfully"));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to update project"));
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

            if ($project->readOne()) {
                // Delete images from filesystem
                if ($project->main_image_path) {
                    UploadUtil::deleteFile($project->main_image_path);
                }

                // Delete detail images
                $detail_stmt = $project->getDetailImages();
                while ($detail_row = $detail_stmt->fetch(PDO::FETCH_ASSOC)) {
                    UploadUtil::deleteFile($detail_row['image_path']);
                }

                // Delete from database
                if ($project->delete()) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Project deleted successfully"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Failed to delete project"));
                }
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Project not found"));
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