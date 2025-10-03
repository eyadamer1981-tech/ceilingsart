# Art Ceiling Website - PHP Backend

This is the PHP/MySQL backend version of the Art Ceiling website, ready for deployment on traditional hosting providers like Hostinger.

## 🆕 Latest Updates

- ✅ **Custom Sliders API** - Complete CRUD functionality for custom project sliders
- ✅ **Database Schema Updated** - Added `custom_sliders` table with JSON support
- ✅ **API Routes Configured** - New endpoints for custom slider management
- ✅ **Hosting Ready** - Configured for Hostinger deployment

## 📁 Project Structure

```
art-php/
├── api/
│   ├── config/
│   │   ├── database.php     # Database connection
│   │   ├── config.php       # Site configuration
│   │   └── cors.php         # CORS headers
│   ├── models/
│   │   ├── Project.php
│   │   ├── Service.php
│   │   ├── Blog.php
│   │   ├── Admin.php
│   │   └── CustomSlider.php # NEW: Custom slider model
│   ├── custom-sliders/      # NEW: Custom slider endpoints
│   │   ├── index.php        # GET all, POST new
│   │   └── show.php         # GET/PUT/DELETE by ID
│   ├── projects/
│   ├── services/
│   ├── blogs/
│   ├── admin/
│   ├── utils/
│   └── .htaccess           # API routing rules
├── database/
│   └── schema.sql          # Updated with custom_sliders table
├── uploads/                # File upload directory
├── .htaccess              # Main Apache configuration
├── composer.json          # PHP dependencies
├── DEPLOYMENT_GUIDE.md    # Complete deployment instructions
├── HOSTINGER_SETUP_GUIDE.md # Hostinger-specific setup
└── README_PHP.md          # This file
```

## 🚀 Quick Deployment

### For Hostinger Hosting:

1. **Upload Files**: Copy all contents to `public_html/`
2. **Database Setup**: Import `database/schema.sql` to your MySQL database
3. **Configuration**: Update `api/config/config.php` with your database credentials
4. **Permissions**: Set `uploads/` folder to 755 permissions
5. **Test**: Visit `https://yourdomain.com/api/services`

### For Development:

1. **Requirements**: PHP 7.4+, MySQL 5.7+, Apache with mod_rewrite
2. **Database**: Create database and import `database/schema.sql`
3. **Configuration**: Update `api/config/config.php` with local database settings
4. **Server**: Point document root to this folder
5. **Test**: Visit `http://localhost/api/services`

## 🔗 API Endpoints

### Core Endpoints
- `GET /api/services` - All services
- `GET /api/projects` - All projects
- `GET /api/blogs` - All blogs
- `POST /api/admin/login` - Admin authentication

### 🆕 New Custom Sliders Endpoints
- `GET /api/custom-sliders` - Get all active sliders
- `POST /api/custom-sliders` - Create new slider (requires auth)
- `GET /api/custom-sliders/{id}` - Get specific slider
- `PUT /api/custom-sliders/{id}` - Update slider (requires auth)
- `DELETE /api/custom-sliders/{id}` - Delete slider (requires auth)

## 🗄️ Database Changes

### New Table: custom_sliders

```sql
CREATE TABLE custom_sliders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_ids JSON NOT NULL,           -- Stores array of project IDs
    order_position INT DEFAULT 0,        -- Display order
    is_active BOOLEAN DEFAULT TRUE,      -- Active/inactive status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_position (order_position),
    INDEX idx_is_active (is_active),
    INDEX idx_created_at (created_at)
);
```

## 🔧 Configuration

### Database Settings (`api/config/config.php`)

```php
const DB_HOST = 'localhost';
const DB_NAME = 'your_database_name';
const DB_USER = 'your_username';
const DB_PASS = 'your_password';
```

### Site Settings

```php
const SITE_URL = 'https://yourdomain.com';
const API_URL = 'https://yourdomain.com/api';
const JWT_SECRET = 'your-unique-secret-key';
```

## 🔐 Security Features

- **JWT Authentication** for admin operations
- **SQL Injection Protection** via prepared statements
- **File Upload Security** with type validation
- **CORS Configuration** for cross-origin requests
- **Input Sanitization** for all user inputs
- **Protected Files** via .htaccess rules

## 📱 Frontend Integration

This PHP backend is designed to work with:

1. **Next.js Frontend** (recommended - deployed on Vercel)
2. **Static HTML/JS Frontend** (can be served from same host)
3. **React/Vue/Angular Apps** (via API calls)

### Example API Usage

```javascript
// Get all custom sliders
const sliders = await fetch('https://yourdomain.com/api/custom-sliders')
  .then(res => res.json());

// Create new slider (requires authentication)
const newSlider = await fetch('https://yourdomain.com/api/custom-sliders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify({
    title: 'My Custom Slider',
    description: 'Slider description',
    projectIds: [1, 2, 3, 4, 5],
    order: 1
  })
}).then(res => res.json());
```

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions for both Hostinger and Vercel
- **[HOSTINGER_SETUP_GUIDE.md](HOSTINGER_SETUP_GUIDE.md)** - Detailed Hostinger-specific setup
- **[database/schema.sql](database/schema.sql)** - Complete database structure

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check credentials in `config.php`
   - Verify database exists
   - Ensure user has proper privileges

2. **File Upload Issues**
   - Check `uploads/` folder permissions (755)
   - Verify PHP upload limits
   - Check available disk space

3. **API 404 Errors**
   - Verify `.htaccess` files are uploaded
   - Check if mod_rewrite is enabled
   - Ensure correct file structure

4. **CORS Issues**
   - Update allowed origins in `cors.php`
   - Check request headers and methods

## 📈 Performance Tips

- Enable **OPcache** in PHP settings
- Use **MySQL query optimization**
- Implement **image compression** for uploads
- Enable **Gzip compression** (configured in .htaccess)
- Use **CDN** for static assets

## 🔄 Syncing with Next.js Version

When making changes to the Next.js version in the parent directory:

1. **API Changes**: Convert TypeScript endpoints to PHP
2. **Database Models**: Update MySQL schema and PHP models
3. **Validation**: Mirror validation logic in PHP
4. **Authentication**: Keep JWT handling consistent

## 📞 Support

For issues specific to this PHP backend:

1. Check error logs in your hosting control panel
2. Verify database connectivity with a simple test script
3. Use browser developer tools to inspect API responses
4. Review the deployment guides for step-by-step instructions

---

**Ready for Production** ✅ | **Hosting Ready** ✅ | **Custom Sliders** ✅