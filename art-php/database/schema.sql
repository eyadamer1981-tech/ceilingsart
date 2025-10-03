-- MySQL Database Schema for Art Ceiling Website
-- Drop database if exists and create new one
DROP DATABASE IF EXISTS artceiling;
CREATE DATABASE artceiling CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE artceiling;

-- Admins table
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    main_image_path VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_featured (featured),
    INDEX idx_created_at (created_at)
);

-- Service detail images table
CREATE TABLE service_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    INDEX idx_service_id (service_id)
);

-- Projects table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    main_image_path VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_featured (featured),
    INDEX idx_created_at (created_at)
);

-- Project detail images table
CREATE TABLE project_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id)
);

-- Blogs table
CREATE TABLE blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT NOT NULL,
    main_image_path VARCHAR(500),
    author VARCHAR(255) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (featured),
    INDEX idx_created_at (created_at),
    INDEX idx_author (author)
);

-- Custom sliders table
CREATE TABLE custom_sliders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_ids JSON NOT NULL,
    order_position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_position (order_position),
    INDEX idx_is_active (is_active),
    INDEX idx_created_at (created_at)
);

-- Insert default admin (password: admin123)
INSERT INTO admins (email, password) VALUES
('admin@artceiling.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');