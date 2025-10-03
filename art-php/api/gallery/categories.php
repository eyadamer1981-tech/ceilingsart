<?php
require_once '../config/cors.php';

// Gallery endpoints removed in favor of Projects. Keep this stub to avoid 404s.
http_response_code(410);
echo json_encode(array("message" => "Gallery API removed. Use /api/projects/categories."));
?>