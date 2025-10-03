<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Service.php';
require_once '../utils/jwt.php';
require_once '../utils/upload.php';

$database = new Database();
$db = $database->getConnection();

$service = new Service($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $stmt = $service->read();
            $services = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $service_item = array(
                    "_id" => $id,
                    "id" => $id,
                    "title" => $title,
                    "descriptionEn" => $description_en,
                    "descriptionAr" => $description_ar,
                    "category" => $category,
                    "image" => $main_image_path ? UploadUtil::getFileUrl($main_image_path) : null,
                    "featured" => (bool) $featured,
                    "createdAt" => $created_at
                );

                // Get detail images
                $service->id = $id;
                $detail_stmt = $service->getDetailImages();
                $detail_images = array();

                while ($detail_row = $detail_stmt->fetch(PDO::FETCH_ASSOC)) {
                    $detail_images[] = UploadUtil::getFileUrl($detail_row['image_path']);
                }

                $service_item["detailImages"] = $detail_images;
                $services[] = $service_item;
            }

            http_response_code(200);
            echo json_encode($services);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error"));
        }
        break;

    case 'POST':
        try {
            // Verify authentication
            JWTUtil::requireAuth();

            // Get form data
            $title = $_POST['title'] ?? '';
            $descriptionEn = $_POST['descriptionEn'] ?? '';
            $descriptionAr = $_POST['descriptionAr'] ?? '';
            $category = $_POST['category'] ?? '';
            $featured = $_POST['featured'] ?? 'false';

            // Validate required fields
            if (empty($title) || empty($descriptionEn) || empty($descriptionAr) || empty($category)) {
                http_response_code(400);
                echo json_encode(array("message" => "Missing required fields"));
                exit;
            }

            // Handle main image upload
            $main_image_path = '';
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $main_image_path = UploadUtil::uploadFile($_FILES['image'], $category, $title, false);
            } elseif (isset($_POST['imageBase64']) && !empty($_POST['imageBase64'])) {
                $main_image_path = UploadUtil::base64ToFile($_POST['imageBase64'], $category, $title, false);
            }

            if (empty($main_image_path)) {
                http_response_code(400);
                echo json_encode(array("message" => "Main image is required"));
                exit;
            }

            // Create service
            $service->title = $title;
            $service->description_en = $descriptionEn;
            $service->description_ar = $descriptionAr;
            $service->category = $category;
            $service->main_image_path = $main_image_path;
            $service->featured = ($featured === 'true');

            if ($service->create()) {
                // Handle detail images
                if (isset($_FILES['detailImages'])) {
                    $detail_images = UploadUtil::uploadMultipleFiles($_FILES['detailImages'], $category, $title);
                    foreach ($detail_images as $index => $image_path) {
                        $service->addDetailImage($image_path, $index);
                    }
                }

                // Handle base64 detail images
                if (isset($_POST['detailImagesBase64'])) {
                    $detail_images_base64 = json_decode($_POST['detailImagesBase64'], true);
                    if (is_array($detail_images_base64)) {
                        foreach ($detail_images_base64 as $index => $base64_data) {
                            $image_path = UploadUtil::base64ToFile($base64_data, $category, $title, true);
                            $service->addDetailImage($image_path, $index);
                        }
                    }
                }

                http_response_code(201);
                echo json_encode(array(
                    "_id" => $service->id,
                    "id" => $service->id,
                    "title" => $service->title,
                    "descriptionEn" => $service->description_en,
                    "descriptionAr" => $service->description_ar,
                    "category" => $service->category,
                    "image" => UploadUtil::getFileUrl($service->main_image_path),
                    "featured" => $service->featured,
                    "message" => "Service created successfully"
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to create service"));
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