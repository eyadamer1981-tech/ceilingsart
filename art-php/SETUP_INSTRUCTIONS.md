# Art Ceiling Website - PHP Backend Setup

This guide explains how to convert your Next.js/MongoDB website to PHP/MySQL while maintaining full functionality.

## Prerequisites

- **PHP 7.4+** with extensions: `pdo`, `pdo_mysql`, `gd`, `fileinfo`
- **MySQL 5.7+** or **MariaDB 10.3+**
- **Apache** or **Nginx** web server
- **Composer** (PHP package manager)

## Installation Steps

### 1. Database Setup

1. Create MySQL database and import schema:
```bash
mysql -u root -p
```

```sql
CREATE DATABASE artceiling CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE artceiling;
SOURCE database/schema.sql;
```

2. Update database credentials in `api/config/database.php`:
```php
private $host = 'localhost';
private $db_name = 'artceiling';
private $username = 'your_username';
private $password = 'your_password';
```

### 2. PHP Dependencies

Install required packages:
```bash
composer install
```

### 3. File Permissions

Create uploads directory and set permissions:
```bash
mkdir uploads
chmod 755 uploads
```

### 4. Web Server Configuration

#### Apache (.htaccess included)
- Ensure mod_rewrite is enabled
- Point document root to the project directory
- The `.htaccess` file in `/api/` handles URL routing

#### Nginx
Add this to your server block:
```nginx
location /api/ {
    try_files $uri $uri/ /api/index.php?$query_string;
}

location /uploads/ {
    try_files $uri =404;
}
```

### 5. Frontend Configuration

Update your frontend API calls to point to the PHP backend:

Replace Next.js API routes:
- `/api/services` → `http://yourserver.com/api/services`
- `/api/projects` → `http://yourserver.com/api/projects`
- `/api/blogs` → `http://yourserver.com/api/blogs`
- `/api/admin/login` → `http://yourserver.com/api/admin/login`

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (requires auth)
- `GET /api/services/{id}` - Get specific service
- `PUT /api/services/{id}` - Update service (requires auth)
- `DELETE /api/services/{id}` - Delete service (requires auth)
- `GET /api/services/featured` - Get featured services
- `GET /api/services/categories` - Get service categories

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (requires auth)
- `GET /api/projects/{id}` - Get specific project
- `PUT /api/projects/{id}` - Update project (requires auth)
- `DELETE /api/projects/{id}` - Delete project (requires auth)
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/categories` - Get project categories
- `GET /api/projects/light` - Get projects (lightweight)

### Blogs
- `GET /api/blogs` - Get all blogs (max 8)
- `POST /api/blogs` - Create blog (requires auth)
- `GET /api/blogs/{id}` - Get specific blog
- `PUT /api/blogs/{id}` - Update blog (requires auth)
- `DELETE /api/blogs/{id}` - Delete blog (requires auth)
- `GET /api/blogs/featured` - Get featured blogs

### Other
- `POST /api/upload` - Upload file (requires auth)
- `GET /api/featured` - Get all featured content

## Default Admin Account

- **Email:** admin@artceiling.com
- **Password:** admin123

**Important:** Change this password immediately after setup!

## File Upload

- Images are stored in `/uploads/` directory
- Supported formats: JPEG, PNG, GIF, WebP
- Maximum file size: 5MB
- Files are automatically renamed with unique identifiers

## Migration from MongoDB

If you have existing data in MongoDB, you'll need to:

1. Export your MongoDB collections
2. Transform the data to match MySQL schema
3. Import into MySQL tables

Example for services:
```javascript
// MongoDB export
mongoexport --db=artceiling --collection=services --out=services.json

// Transform and import (create custom script)
```

## Security Notes

- JWT tokens expire after 24 hours
- All admin operations require authentication
- File uploads are restricted to image types
- Input validation and sanitization implemented
- SQL injection protection via prepared statements

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL service is running
   - Verify credentials in `database.php`
   - Ensure database exists

2. **File Upload Issues**
   - Check `uploads/` directory permissions
   - Verify PHP upload settings in `php.ini`
   - Ensure sufficient disk space

3. **JWT Authentication Errors**
   - Check token in Authorization header format: `Bearer {token}`
   - Verify JWT secret key matches
   - Check token expiration

4. **CORS Issues**
   - Update `cors.php` with your frontend domain
   - Ensure proper headers in requests

## Performance Optimization

- Enable PHP OPcache
- Use MySQL query caching
- Implement Redis for session storage
- Compress images before upload
- Use CDN for static assets

## Backup Strategy

Regular backups should include:
- MySQL database dump
- `/uploads/` directory
- Configuration files

```bash
# Database backup
mysqldump -u username -p artceiling > backup_$(date +%Y%m%d).sql

# Files backup
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```