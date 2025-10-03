<?php
require_once '../config/cors.php';
require_once '../config/database.php';
require_once '../models/CustomSlider.php';
require_once '../models/Project.php';
require_once '../utils/jwt.php';

$database = new Database();
$db = $database->getConnection();

$customSlider = new CustomSlider($db);
$project = new Project($db);

// Get ID from URL parameter
$id = $_GET['id'] ?? '';

if (empty($id)) {
    http_response_code(400);
    echo json_encode(array("message" => "Slider ID is required"));
    exit;
}

$customSlider->id = $id;

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            if ($customSlider->readOne()) {
                $projects_data = $customSlider->getProjectsData();

                $slider_item = array(
                    "_id" => $customSlider->id,
                    "id" => $customSlider->id,
                    "title" => $customSlider->title,
                    "description" => $customSlider->description,
                    "projectIds" => json_decode($customSlider->project_ids, true),
                    "projects" => $projects_data,
                    "order" => $customSlider->order_position,
                    "isActive" => (bool) $customSlider->is_active,
                    "createdAt" => $customSlider->created_at,
                    "updatedAt" => $customSlider->updated_at
                );

                http_response_code(200);
                echo json_encode($slider_item);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Slider not found"));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error", "detail" => $e->getMessage()));
        }
        break;

    case 'PUT':
        try {
            // Verify authentication
            JWTUtil::requireAuth();

            // Check if slider exists
            if (!$customSlider->readOne()) {
                http_response_code(404);
                echo json_encode(array("message" => "Slider not found"));
                exit;
            }

            // Get JSON data
            $json = json_decode(file_get_contents("php://input"), true);

            $title = $json['title'] ?? $customSlider->title;
            $description = $json['description'] ?? $customSlider->description;
            $projectIds = $json['projectIds'] ?? json_decode($customSlider->project_ids, true);
            $order = $json['order'] ?? $customSlider->order_position;
            $isActive = isset($json['isActive']) ? $json['isActive'] : $customSlider->is_active;

            // If projectIds are being updated, verify they exist
            if (isset($json['projectIds']) && is_array($projectIds)) {
                foreach ($projectIds as $projectId) {
                    $project->id = $projectId;
                    if (!$project->readOne()) {
                        http_response_code(400);
                        echo json_encode(array("message" => "Project ID $projectId does not exist"));
                        exit;
                    }
                }
            }

            // Update custom slider
            $customSlider->title = $title;
            $customSlider->description = $description;
            $customSlider->project_ids = json_encode($projectIds);
            $customSlider->order_position = $order;
            $customSlider->is_active = $isActive;

            if ($customSlider->update()) {
                // Get the updated slider data with projects
                $customSlider->readOne();
                $projects_data = $customSlider->getProjectsData();

                http_response_code(200);
                echo json_encode(array(
                    "_id" => $customSlider->id,
                    "id" => $customSlider->id,
                    "title" => $customSlider->title,
                    "description" => $customSlider->description,
                    "projectIds" => json_decode($customSlider->project_ids, true),
                    "projects" => $projects_data,
                    "order" => $customSlider->order_position,
                    "isActive" => (bool) $customSlider->is_active,
                    "createdAt" => $customSlider->created_at,
                    "updatedAt" => $customSlider->updated_at
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to update custom slider"));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error: " . $e->getMessage()));
        }
        break;

    case 'DELETE':
        try {
            // Verify authentication
            JWTUtil::requireAuth();

            // Check if slider exists
            if (!$customSlider->readOne()) {
                http_response_code(404);
                echo json_encode(array("message" => "Slider not found"));
                exit;
            }

            if ($customSlider->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Slider deleted successfully"));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to delete slider"));
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