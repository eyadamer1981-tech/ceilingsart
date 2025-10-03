# Art Ceiling Website - Complete Deployment Guide

This guide covers deployment options for your Art Ceiling website, supporting both PHP (Hostinger) and Next.js (Vercel) hosting approaches.

## Deployment Options

### Option 1: PHP Backend + Static Frontend (Hostinger)
- **Backend**: PHP API on Hostinger
- **Frontend**: Static files served from Hostinger
- **Database**: MySQL on Hostinger
- **Best for**: Complete control, cost-effective

### Option 2: Next.js Full-Stack (Vercel)
- **Frontend + API**: Next.js on Vercel
- **Database**: MongoDB Atlas or external MySQL
- **Best for**: Serverless, global CDN, automatic scaling

### Option 3: Hybrid (Recommended)
- **Backend**: PHP API on Hostinger
- **Frontend**: Next.js on Vercel
- **Database**: MySQL on Hostinger
- **Best for**: Best performance and flexibility

## 🚀 Quick Start - Hybrid Deployment

### Step 1: Deploy PHP Backend to Hostinger

1. **Upload art-php folder contents** to Hostinger `public_html/api/`
2. **Create MySQL database** and import `database/schema.sql`
3. **Update database config** in `api/config/config.php`
4. **Set file permissions**: uploads folder to 755
5. **Test API**: Visit `https://yourdomain.com/api/services`

### Step 2: Deploy Next.js Frontend to Vercel

1. **Connect your Git repository** to Vercel
2. **Set environment variables**:
   ```
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api
   MONGODB_URI=your_mongodb_connection_string (if using MongoDB)
   ```
3. **Deploy**: Vercel will auto-deploy from your main branch
4. **Test frontend**: Visit your Vercel URL

## 📋 Detailed PHP Backend Setup (Hostinger)

### Database Configuration

1. Create MySQL database in Hostinger hPanel
2. Import the updated schema with custom_sliders table:

```sql
-- Custom sliders table (added)
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
```

3. Update `api/config/config.php`:

```php
const DB_HOST = 'localhost';
const DB_NAME = 'u123456789_artceiling';
const DB_USER = 'u123456789_artuser';
const DB_PASS = 'YourActualPassword';
const SITE_URL = 'https://yourdomain.com';
const API_URL = 'https://yourdomain.com/api';
```

### File Structure on Hostinger

```
public_html/
├── api/
│   ├── config/
│   ├── models/
│   │   ├── Project.php
│   │   ├── Service.php
│   │   ├── Blog.php
│   │   ├── Admin.php
│   │   └── CustomSlider.php (new)
│   ├── custom-sliders/ (new)
│   │   ├── index.php
│   │   └── show.php
│   ├── projects/
│   ├── services/
│   ├── blogs/
│   ├── admin/
│   ├── utils/
│   └── .htaccess
├── uploads/
│   ├── .htaccess
│   └── [category folders]
├── .htaccess
└── composer.json
```

### New Custom Sliders API Endpoints

The following endpoints have been added:

- **GET** `/api/custom-sliders` - Get all active sliders
- **POST** `/api/custom-sliders` - Create new slider (requires auth)
- **GET** `/api/custom-sliders/{id}` - Get specific slider
- **PUT** `/api/custom-sliders/{id}` - Update slider (requires auth)
- **DELETE** `/api/custom-sliders/{id}` - Delete slider (requires auth)

## 📋 Next.js Frontend Setup (Vercel)

### Environment Variables

Set these in Vercel dashboard:

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
MONGODB_URI=mongodb+srv://... (if using MongoDB for Next.js APIs)
JWT_SECRET=your-jwt-secret-for-nextjs-apis
```

### API Integration

Update your frontend API calls to use the PHP backend:

```javascript
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yourdomain.com/api';

export const customSlidersApi = {
  getAll: () => fetch(`${API_BASE_URL}/custom-sliders`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/custom-sliders/${id}`).then(res => res.json()),
  create: (data, token) => fetch(`${API_BASE_URL}/custom-sliders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  update: (id, data, token) => fetch(`${API_BASE_URL}/custom-sliders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (id, token) => fetch(`${API_BASE_URL}/custom-sliders/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
};
```

## 🔧 Configuration Files Ready

### PHP Backend (.htaccess configured)
- ✅ API routing with custom-sliders endpoints
- ✅ CORS headers
- ✅ Security headers
- ✅ Gzip compression
- ✅ File upload protection

### Next.js Frontend (vercel.json created)
- ✅ Vercel deployment configuration
- ✅ API routing
- ✅ Environment variables setup
- ✅ Function timeout settings

## 🧪 Testing Your Deployment

### Test PHP Backend

1. **Services**: `GET https://yourdomain.com/api/services`
2. **Projects**: `GET https://yourdomain.com/api/projects`
3. **Custom Sliders**: `GET https://yourdomain.com/api/custom-sliders`
4. **Admin Login**: `POST https://yourdomain.com/api/admin/login`

### Test Next.js Frontend

1. **Homepage**: Visit your Vercel URL
2. **API Integration**: Check browser network tab for API calls
3. **Custom Sliders**: Verify slider components load data

## 🔒 Security Checklist

- [ ] Change default admin password from `admin123`
- [ ] Update JWT secret in PHP config
- [ ] Enable HTTPS redirect in .htaccess
- [ ] Set proper file permissions (755 for folders, 644 for files)
- [ ] Verify uploads folder security
- [ ] Test CORS configuration

## 🔄 Sync Changes Between Versions

When updating Next.js, remember to sync these to PHP:

1. **API endpoints** - Convert TypeScript to PHP
2. **Database models** - Update MySQL schema
3. **Validation logic** - Mirror in PHP classes
4. **Authentication** - Keep JWT handling consistent

## 📊 Performance Optimization

### Hostinger PHP
- Enable OPcache in hPanel
- Use MySQL query optimization
- Compress images before upload
- Enable browser caching via .htaccess

### Vercel Next.js
- Use Next.js Image component
- Enable ISR for static content
- Implement proper loading states
- Use Vercel Analytics

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**
- Check `api/config/cors.php` settings
- Verify frontend origin is allowed

**Database Connection**
- Verify credentials in config.php
- Check database exists and user has privileges

**File Upload Issues**
- Check uploads folder permissions (755)
- Verify PHP upload limits
- Check .htaccess file upload restrictions

**API 404 Errors**
- Verify .htaccess rewrite rules
- Check API file structure
- Ensure mod_rewrite is enabled

## 📞 Support

- **Hostinger Issues**: Contact Hostinger support
- **Vercel Issues**: Check Vercel docs and community
- **Code Issues**: Review error logs and console output

Your Art Ceiling website is now ready for production with full custom sliders functionality! 🎉