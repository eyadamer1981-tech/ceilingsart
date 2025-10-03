<?php
// Hostinger Configuration
class Config {
    // Database Configuration - Update these with your Hostinger details
    const DB_HOST = 'localhost';
    const DB_NAME = 'u123456789_artceiling'; // Replace with your actual database name
    const DB_USER = 'u123456789_artuser';    // Replace with your actual username
    const DB_PASS = 'YourSecurePassword';     // Replace with your actual password

    // JWT Configuration
    const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';
    const JWT_ISSUER = 'artceiling-api';
    const JWT_AUDIENCE = 'artceiling-users';
    const JWT_EXPIRY = 24 * 60 * 60; // 24 hours

    // File Upload Configuration
    const UPLOAD_DIR = '../uploads/';
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
    ];

    // Site Configuration
    const SITE_URL = 'https://yourdomain.com'; // Replace with your Hostinger domain
    const API_URL = 'https://yourdomain.com/api'; // Replace with your API URL

    // Error Reporting (set to false in production)
    const DEBUG_MODE = false;

    // Blog Limit
    const MAX_BLOGS = 8;

    public static function init() {
        // Set error reporting based on debug mode
        if (self::DEBUG_MODE) {
            error_reporting(E_ALL);
            ini_set('display_errors', 1);
        } else {
            error_reporting(0);
            ini_set('display_errors', 0);
        }

        // Set timezone
        date_default_timezone_set('UTC');
    }

    public static function getDbConfig() {
        return [
            'host' => self::DB_HOST,
            'dbname' => self::DB_NAME,
            'username' => self::DB_USER,
            'password' => self::DB_PASS
        ];
    }

    public static function getUploadPath() {
        return self::UPLOAD_DIR;
    }

    public static function getPublicUploadUrl($filename) {
        return '/uploads/' . $filename;
    }
}

// Initialize configuration
Config::init();
?>