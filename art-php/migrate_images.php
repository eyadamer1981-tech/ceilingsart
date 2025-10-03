<?php
/**
 * Image Migration Script for Hostinger
 * Migrates images from art_images structure to organized uploads structure
 */

// Configuration
$source_dir = 'art_images/New folder/stretch ceiling/';
$uploads_dir = 'uploads/';

// Category mapping
$category_mapping = [
    'translucent stretch ceiling' => 'translucent_stretch_ceiling',
    'printed stretch ceiling' => 'printed_stretch_ceiling',
    'fiber optic stretch ceiling' => 'fiber_optic_stretch_ceiling',
    'glossy stretch ceiling' => 'glossy_stretch_ceiling'
];

function sanitizeFilename($filename) {
    // Remove extension for processing
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $name = pathinfo($filename, PATHINFO_FILENAME);

    // Convert to lowercase and replace spaces/special chars
    $name = strtolower($name);
    $name = preg_replace('/[^a-z0-9]/', '_', $name);
    $name = preg_replace('/_+/', '_', $name);
    $name = trim($name, '_');

    return $name . '.' . $extension;
}

function createDirectoryStructure($base_dir) {
    $categories = [
        'translucent_stretch_ceiling',
        'printed_stretch_ceiling',
        'fiber_optic_stretch_ceiling',
        'glossy_stretch_ceiling'
    ];

    foreach ($categories as $category) {
        $paths = [
            $base_dir . 'services/' . $category,
            $base_dir . 'projects/' . $category
        ];

        foreach ($paths as $path) {
            if (!file_exists($path)) {
                mkdir($path, 0755, true);
                echo "Created directory: $path\n";
            }
        }
    }

    // Create blogs directory
    if (!file_exists($base_dir . 'blogs')) {
        mkdir($base_dir . 'blogs', 0755, true);
        echo "Created directory: {$base_dir}blogs\n";
    }
}

function migrateImages() {
    global $source_dir, $uploads_dir, $category_mapping;

    echo "Starting image migration...\n";

    // Create directory structure
    createDirectoryStructure($uploads_dir);

    // Scan source directory
    if (!is_dir($source_dir)) {
        echo "Source directory not found: $source_dir\n";
        return;
    }

    $migrated_count = 0;
    $error_count = 0;

    foreach ($category_mapping as $original_category => $sanitized_category) {
        $category_path = $source_dir . $original_category . '/';

        if (!is_dir($category_path)) {
            echo "Category directory not found: $category_path\n";
            continue;
        }

        echo "\nProcessing category: $original_category\n";

        $files = scandir($category_path);

        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;

            $source_file = $category_path . $file;

            if (!is_file($source_file)) continue;

            // Check if it's an image
            $image_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

            if (!in_array($extension, $image_extensions)) {
                echo "Skipping non-image file: $file\n";
                continue;
            }

            // Sanitize filename
            $sanitized_filename = sanitizeFilename($file);

            // Determine if this should be a service or project
            // You may need to adjust this logic based on your data
            $target_type = 'services'; // Default to services

            $target_dir = $uploads_dir . $target_type . '/' . $sanitized_category . '/';
            $target_file = $target_dir . $sanitized_filename;

            // Handle duplicates
            $counter = 1;
            while (file_exists($target_file)) {
                $name = pathinfo($sanitized_filename, PATHINFO_FILENAME);
                $ext = pathinfo($sanitized_filename, PATHINFO_EXTENSION);
                $sanitized_filename = $name . '_' . $counter . '.' . $ext;
                $target_file = $target_dir . $sanitized_filename;
                $counter++;
            }

            // Copy file
            if (copy($source_file, $target_file)) {
                echo "Migrated: $file → $target_type/$sanitized_category/$sanitized_filename\n";
                $migrated_count++;
            } else {
                echo "ERROR: Failed to copy $file\n";
                $error_count++;
            }
        }
    }

    echo "\n=== Migration Complete ===\n";
    echo "Files migrated: $migrated_count\n";
    echo "Errors: $error_count\n";
}

// Run migration
if (php_sapi_name() === 'cli') {
    // Command line execution
    migrateImages();
} else {
    // Web execution (for testing)
    echo "<pre>";
    migrateImages();
    echo "</pre>";
}

/**
 * Manual categorization helper
 * Use this if you need to manually categorize images
 */
function manualCategorization() {
    // Example data - replace with your actual data
    $manual_mapping = [
        // Filename pattern => [type, category]
        'streched_ceiling_example' => ['services', 'translucent_stretch_ceiling'],
        'imperial-printed' => ['projects', 'printed_stretch_ceiling'],
        'star-ceiling' => ['services', 'fiber_optic_stretch_ceiling'],
        // Add more mappings as needed
    ];

    return $manual_mapping;
}

// Usage instructions:
/*
1. Place this script in your project root directory
2. Update the $source_dir path to point to your art_images folder
3. Run from command line: php migrate_images.php
4. Or run from web browser for testing
5. Check the uploads/ directory for migrated files
*/
?>