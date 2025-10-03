<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Service.php';
require_once '../utils/jwt.php';
require_once '../utils/upload.php';

$database = new Database();
$db = $database->getConnection();

$service = new Service($db);

// Get service ID from URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid service ID"));
    exit;
}

$service->id = $id;

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            if ($service->readOne()) {
                // Get detail images
                $detail_stmt = $service->getDetailImages();
                $detail_images = array();

                while ($detail_row = $detail_stmt->fetch(PDO::FETCH_ASSOC)) {
                    $detail_images[] = UploadUtil::getFileUrl($detail_row['image_path']);
                }

                $service_item = array(
                    "_id" => $service->id,
                    "id" => $service->id,
                    "title" => $service->title,
                    "descriptionEn" => $service->description_en,
                    "descriptionAr" => $service->description_ar,
                    "category" => $service->category,
                    "image" => $service->main_image_path ? UploadUtil::getFileUrl($service->main_image_path) : null,
                    "detailImages" => $detail_images,
                    "featured" => (bool) $service->featured,
                    "createdAt" => $service->created_at
                );

                http_response_code(200);
                echo json_encode($service_item);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Service not found"));
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

            $service->title = $json->title ?? '';
            $service->description_en = $json->descriptionEn ?? '';
            $service->description_ar = $json->descriptionAr ?? '';
            $service->category = $json->category ?? '';
            $service->featured = $json->featured ?? false;

            // Keep existing image if not provided
            if (!$service->readOne()) {
                http_response_code(404);
                echo json_encode(array("message" => "Service not found"));
                exit;
            }

            if ($service->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Service updated successfully"));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to update service"));
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

            if ($service->readOne()) {
                // Delete images from filesystem
                if ($service->main_image_path) {
                    UploadUtil::deleteFile($service->main_image_path);
                }

                // Delete detail images
                $detail_stmt = $service->getDetailImages();
                while ($detail_row = $detail_stmt->fetch(PDO::FETCH_ASSOC)) {
                    UploadUtil::deleteFile($detail_row['image_path']);
                }

                // Delete from database
                if ($service->delete()) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Service deleted successfully"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Failed to delete service"));
                }
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Service not found"));
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