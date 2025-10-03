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

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $stmt = $customSlider->readActive();
            $sliders = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $slider_item = array(
                    "_id" => $id,
                    "id" => $id,
                    "title" => $title,
                    "description" => $description,
                    "projectIds" => json_decode($project_ids, true),
                    "order" => $order_position,
                    "isActive" => (bool) $is_active,
                    "createdAt" => $created_at,
                    "updatedAt" => $updated_at
                );

                // Get projects data
                $customSlider->id = $id;
                $customSlider->project_ids = $project_ids;
                $projects_data = $customSlider->getProjectsData();
                $slider_item["projects"] = $projects_data;

                $sliders[] = $slider_item;
            }

            http_response_code(200);
            echo json_encode($sliders);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Server error", "detail" => $e->getMessage()));
        }
        break;

    case 'POST':
        try {
            // Verify authentication
            JWTUtil::requireAuth();

            // Get JSON data
            $json = json_decode(file_get_contents("php://input"), true);

            $title = $json['title'] ?? '';
            $description = $json['description'] ?? '';
            $projectIds = $json['projectIds'] ?? [];
            $order = $json['order'] ?? 0;

            // Validate required fields
            if (empty($title) || empty($projectIds) || !is_array($projectIds)) {
                http_response_code(400);
                echo json_encode(array("message" => "Title and projectIds are required"));
                exit;
            }

            // Verify that all project IDs exist
            foreach ($projectIds as $projectId) {
                $project->id = $projectId;
                if (!$project->readOne()) {
                    http_response_code(400);
                    echo json_encode(array("message" => "Project ID $projectId does not exist"));
                    exit;
                }
            }

            // Create custom slider
            $customSlider->title = $title;
            $customSlider->description = $description;
            $customSlider->project_ids = json_encode($projectIds);
            $customSlider->order_position = $order;
            $customSlider->is_active = true;

            if ($customSlider->create()) {
                // Get the created slider data with projects
                $customSlider->readOne();
                $projects_data = $customSlider->getProjectsData();

                http_response_code(201);
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
                    "updatedAt" => $customSlider->updated_at,
                    "message" => "Custom slider created successfully"
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to create custom slider"));
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