<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/Project.php';
require_once '../utils/jwt.php';
require_once '../utils/upload.php';

$database = new Database();
$db = $database->getConnection();

$project = new Project($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $stmt = $project->read();
            $projects = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $project_item = array(
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
                $project->id = $id;
                $detail_stmt = $project->getDetailImages();
                $detail_images = array();

                while ($detail_row = $detail_stmt->fetch(PDO::FETCH_ASSOC)) {
                    $detail_images[] = UploadUtil::getFileUrl($detail_row['image_path']);
                }

                $project_item["detailImages"] = $detail_images;
                $projects[] = $project_item;
            }

            http_response_code(200);
            echo json_encode($projects);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error", "detail" => $e->getMessage()));
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

            // Create project
            $project->title = $title;
            $project->description_en = $descriptionEn;
            $project->description_ar = $descriptionAr;
            $project->category = $category;
            $project->main_image_path = $main_image_path;
            $project->featured = ($featured === 'true');

            if ($project->create()) {
                // Handle detail images
                if (isset($_FILES['detailImages'])) {
                    $detail_images = UploadUtil::uploadMultipleFiles($_FILES['detailImages'], $category, $title);
                    foreach ($detail_images as $index => $image_path) {
                        $project->addDetailImage($image_path, $index);
                    }
                }

                // Handle base64 detail images
                if (isset($_POST['detailImagesBase64'])) {
                    $detail_images_base64 = json_decode($_POST['detailImagesBase64'], true);
                    if (is_array($detail_images_base64)) {
                        foreach ($detail_images_base64 as $index => $base64_data) {
                            $image_path = UploadUtil::base64ToFile($base64_data, $category, $title, true);
                            $project->addDetailImage($image_path, $index);
                        }
                    }
                }

                http_response_code(201);
                echo json_encode(array(
                    "_id" => $project->id,
                    "id" => $project->id,
                    "title" => $project->title,
                    "descriptionEn" => $project->description_en,
                    "descriptionAr" => $project->description_ar,
                    "category" => $project->category,
                    "image" => UploadUtil::getFileUrl($project->main_image_path),
                    "featured" => $project->featured,
                    "message" => "Project created successfully"
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to create project"));
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