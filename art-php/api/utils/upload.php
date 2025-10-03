<?php
class UploadUtil {
    private static $upload_dir = '../uploads/';
    private static $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    private static $max_file_size = 5 * 1024 * 1024; // 5MB

    public static function uploadFile($file, $category = '', $title = '', $isDetail = false) {
        // Create category-based directory structure
        $category_dir = self::$upload_dir . self::sanitizeForFilename($category) . '/';
        if (!file_exists($category_dir)) {
            mkdir($category_dir, 0755, true);
        }

        // Validate file
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new Exception('File upload error: ' . $file['error']);
        }

        if ($file['size'] > self::$max_file_size) {
            throw new Exception('File size exceeds maximum allowed size (5MB)');
        }

        if (!in_array($file['type'], self::$allowed_types)) {
            throw new Exception('File type not allowed. Only JPEG, PNG, GIF, and WebP are supported.');
        }

        // Generate filename based on title
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $sanitized_title = self::sanitizeForFilename($title);

        if ($isDetail) {
            $filename = $sanitized_title . '_detail_' . time() . '.' . $extension;
        } else {
            $filename = $sanitized_title . '.' . $extension;
        }

        $target_path = $category_dir . $filename;
        $relative_path = self::sanitizeForFilename($category) . '/' . $filename;

        // Handle duplicate filenames
        $counter = 1;
        while (file_exists($target_path)) {
            $name_without_ext = pathinfo($filename, PATHINFO_FILENAME);
            $filename = $name_without_ext . '_' . $counter . '.' . $extension;
            $target_path = $category_dir . $filename;
            $relative_path = self::sanitizeForFilename($category) . '/' . $filename;
            $counter++;
        }

        // Move uploaded file
        if (!move_uploaded_file($file['tmp_name'], $target_path)) {
            throw new Exception('Failed to move uploaded file');
        }

        return $relative_path;
    }

    private static function sanitizeForFilename($string) {
        // Convert to lowercase and replace spaces with underscores
        $string = strtolower($string);
        $string = str_replace(' ', '_', $string);

        // Remove special characters except underscores and hyphens
        $string = preg_replace('/[^a-z0-9_-]/', '', $string);

        // Remove multiple underscores
        $string = preg_replace('/_+/', '_', $string);

        // Trim underscores from beginning and end
        $string = trim($string, '_');

        return $string ?: 'default';
    }

    public static function uploadMultipleFiles($files, $category = '', $title = '') {
        $uploaded_files = [];

        if (is_array($files['name'])) {
            // Multiple files
            for ($i = 0; $i < count($files['name']); $i++) {
                $file = [
                    'name' => $files['name'][$i],
                    'type' => $files['type'][$i],
                    'tmp_name' => $files['tmp_name'][$i],
                    'error' => $files['error'][$i],
                    'size' => $files['size'][$i]
                ];

                $uploaded_files[] = self::uploadFile($file, $category, $title, true);
            }
        } else {
            // Single file
            $uploaded_files[] = self::uploadFile($files, $category, $title, true);
        }

        return $uploaded_files;
    }

    public static function deleteFile($filename) {
        $file_path = self::$upload_dir . $filename;
        if (file_exists($file_path)) {
            return unlink($file_path);
        }
        return false;
    }

    public static function getFileUrl($filename) {
        return '/uploads/' . $filename;
    }

    public static function base64ToFile($base64_data, $category = '', $title = '', $isDetail = false) {
        // Remove data URL prefix if present
        if (strpos($base64_data, 'data:') === 0) {
            list($type, $data) = explode(';', $base64_data);
            list(, $data) = explode(',', $data);
            $base64_data = $data;

            // Extract mime type
            $mime_type = str_replace('data:', '', $type);
        } else {
            $mime_type = 'image/jpeg'; // Default
        }

        // Validate mime type
        if (!in_array($mime_type, self::$allowed_types)) {
            throw new Exception('File type not allowed');
        }

        // Decode base64
        $binary_data = base64_decode($base64_data);
        if ($binary_data === false) {
            throw new Exception('Invalid base64 data');
        }

        // Create category-based directory structure
        $category_dir = self::$upload_dir . self::sanitizeForFilename($category) . '/';
        if (!file_exists($category_dir)) {
            mkdir($category_dir, 0755, true);
        }

        // Generate filename based on title
        $extension = explode('/', $mime_type)[1];
        if ($extension === 'jpeg') $extension = 'jpg';

        $sanitized_title = self::sanitizeForFilename($title);
        if ($isDetail) {
            $filename = $sanitized_title . '_detail_' . time() . '.' . $extension;
        } else {
            $filename = $sanitized_title . '.' . $extension;
        }

        $target_path = $category_dir . $filename;
        $relative_path = self::sanitizeForFilename($category) . '/' . $filename;

        // Handle duplicate filenames
        $counter = 1;
        while (file_exists($target_path)) {
            $name_without_ext = pathinfo($filename, PATHINFO_FILENAME);
            $filename = $name_without_ext . '_' . $counter . '.' . $extension;
            $target_path = $category_dir . $filename;
            $relative_path = self::sanitizeForFilename($category) . '/' . $filename;
            $counter++;
        }

        // Save file
        if (!file_put_contents($target_path, $binary_data)) {
            throw new Exception('Failed to save file');
        }

        return $relative_path;
    }
}
?>