# Art Ceiling Website - Hostinger Hosting Setup Guide

This guide provides step-by-step instructions for deploying your PHP/MySQL Art Ceiling website on Hostinger.

## Prerequisites

✅ **Hostinger Account** with PHP 7.4+ support
✅ **MySQL Database** access
✅ **File Manager** or **FTP** access
✅ **Domain** connected to your hosting account

## Step 1: Database Setup

### 1.1 Create MySQL Database

1. Login to **Hostinger hPanel**
2. Go to **Databases** → **MySQL Databases**
3. Click **Create Database**
4. Database name: `u[your_user_id]_artceiling` (e.g., `u123456789_artceiling`)
5. Create database user with full privileges
6. Note down: **Database name**, **Username**, **Password**

### 1.2 Import Database Schema

1. Go to **phpMyAdmin** in hPanel
2. Select your database
3. Click **Import** tab
4. Upload the `database/schema.sql` file
5. Click **Go** to execute

## Step 2: File Upload

### 2.1 Upload Project Files

Using **File Manager** in hPanel:

1. Navigate to `public_html/` directory
2. Upload all project files:
   ```
   public_html/
   ├── api/
   ├── uploads/
   ├── .htaccess
   ├── composer.json
   └── [other files]
   ```

### 2.2 Set File Permissions

Set these permissions in File Manager:
- **api/** folder: `755`
- **uploads/** folder: `755` (with write permissions)
- **All PHP files**: `644`
- **.htaccess files**: `644`

## Step 3: Configuration

### 3.1 Update Database Configuration

Edit `api/config/config.php`:

```php
const DB_HOST = 'localhost';
const DB_NAME = 'u123456789_artceiling'; // Your actual database name
const DB_USER = 'u123456789_artuser';    // Your actual username
const DB_PASS = 'YourActualPassword';     // Your actual password
```

### 3.2 Update Site URLs

In `api/config/config.php`:

```php
const SITE_URL = 'https://yourdomain.com';      // Your Hostinger domain
const API_URL = 'https://yourdomain.com/api';   // Your API URL
```

### 3.3 Production Settings

Set debug mode to false:

```php
const DEBUG_MODE = false;
```

## Step 4: Install Dependencies

### 4.1 Using Composer (if available)

If Hostinger supports Composer:

1. Access **SSH** or **Terminal** in hPanel
2. Navigate to your domain directory
3. Run: `composer install`

### 4.2 Manual Installation (alternative)

If Composer is not available:

1. Download the required JWT library manually
2. Create `vendor/` folder in your project root
3. Upload the Firebase JWT library to `vendor/firebase/php-jwt/`

## Step 5: Upload Folder Structure

Create this organized folder structure in `uploads/`:

```
uploads/
├── .htaccess
├── services/
│   ├── stretch_ceiling/
│   ├── translucent_ceiling/
│   ├── printed_ceiling/
│   └── fiber_optic_ceiling/
├── projects/
│   ├── stretch_ceiling/
│   ├── translucent_ceiling/
│   ├── printed_ceiling/
│   └── fiber_optic_ceiling/
└── blogs/
```

### 5.1 Upload Your Existing Images

Copy your existing images from `art_images/` to the appropriate folders:

- **Services**: `uploads/[category]/[title].[ext]`
- **Projects**: `uploads/[category]/[title].[ext]`
- **Blogs**: `uploads/blogs/[title].[ext]`

Example:
```
art_images/stretch ceiling/translucent stretch ceiling/example.jpg
→ uploads/translucent_stretch_ceiling/example.jpg
```

## Step 6: SSL Certificate Setup

### 6.1 Enable SSL in Hostinger

1. Go to **SSL** in hPanel
2. Enable **Let's Encrypt SSL** for your domain
3. Force HTTPS by uncommenting these lines in `.htaccess`:

```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Step 7: Test Your API

### 7.1 Test Database Connection

Visit: `https://yourdomain.com/api/services`

Should return JSON array of services.

### 7.2 Test Admin Login

POST to: `https://yourdomain.com/api/admin/login`

```json
{
  "email": "admin@artceiling.com",
  "password": "admin123"
}
```

### 7.3 Test File Upload

Upload a test image to verify folder structure works.

## Step 8: Frontend Configuration

Update your frontend API configuration:

```javascript
// config/api.js
const API_BASE_URL = 'https://yourdomain.com/api';
export default API_BASE_URL;
```

## Step 9: Security Hardening

### 9.1 Change Default Admin Password

1. Login to admin panel
2. Change default password from `admin123`
3. Use a strong password

### 9.2 Update JWT Secret

In `api/config/config.php`:

```php
const JWT_SECRET = 'your-unique-super-secret-key-here';
```

### 9.3 File Security

Ensure these files are protected:
- `.env` files (if used)
- `composer.json/lock`
- Database configuration files

## Step 10: Performance Optimization

### 10.1 Enable Caching

The `.htaccess` files already include:
- **Gzip compression**
- **Browser caching** for images
- **Cache headers**

### 10.2 Image Optimization

Consider optimizing images before upload:
- **Compress images** to reduce file size
- **Use WebP format** when possible
- **Resize images** to appropriate dimensions

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Verify database credentials in `config.php`
- Check if database exists in phpMyAdmin
- Ensure user has proper privileges

**File Upload Errors**
- Check `uploads/` folder permissions (755)
- Verify upload folder structure exists
- Check PHP upload limits in hPanel

**API 404 Errors**
- Verify `.htaccess` files are uploaded
- Check if mod_rewrite is enabled
- Ensure API files are in correct structure

**CORS Issues**
- Update `cors.php` with your domain
- Check frontend API calls use HTTPS

### Hostinger-Specific Notes

1. **PHP Version**: Use PHP 7.4+ from hPanel
2. **Memory Limit**: Default should be sufficient
3. **Upload Limits**: Check hPanel for max upload size
4. **Cron Jobs**: Available for automated tasks
5. **Backup**: Use hPanel backup features

## File Structure Verification

Your final structure should look like:

```
yourdomain.com/
├── api/
│   ├── config/
│   ├── models/
│   ├── utils/
│   ├── services/
│   ├── projects/
│   ├── blogs/
│   ├── admin/
│   └── .htaccess
├── uploads/
│   ├── .htaccess
│   └── [category folders with images]
├── .htaccess
├── composer.json
└── [frontend files]
```

## Post-Deployment Checklist

- [ ] Database connection working
- [ ] All API endpoints responding
- [ ] Admin login functional
- [ ] File uploads working with correct naming
- [ ] Images displaying in frontend
- [ ] SSL certificate active
- [ ] Default password changed
- [ ] Backup strategy in place

## Support

For Hostinger-specific issues:
- Check **Hostinger Knowledge Base**
- Contact **Hostinger Support**
- Use **hPanel Help Center**

For API issues, verify:
- Error logs in hPanel
- PHP error reporting
- Database query logs

Your Art Ceiling website is now ready for production on Hostinger! 🚀