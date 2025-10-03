<?php
require_once 'config/cors.php';
require_once 'config/database.php';
require_once 'models/Service.php';
require_once 'models/Project.php';
require_once 'models/Blog.php';
require_once 'utils/upload.php';

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $result = array(
            "services" => array(),
            "projects" => array(),
            "blogs" => array()
        );

        // Get featured services
        $service = new Service($db);
        $stmt = $service->getFeatured();
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
            $result["services"][] = $service_item;
        }

        // Get featured projects
        $project = new Project($db);
        $stmt = $project->getFeatured();
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
            $result["projects"][] = $project_item;
        }

        // Get featured blogs
        $blog = new Blog($db);
        $stmt = $blog->getFeatured();
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
            $result["blogs"][] = $blog_item;
        }

        http_response_code(200);
        echo json_encode($result);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Server error"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>