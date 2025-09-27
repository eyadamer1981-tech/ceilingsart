# Admin Dashboard Setup Guide

## Overview
This admin dashboard allows you to manage services, projects, and blog posts for the Art Ceiling website. It includes MongoDB integration for data persistence and authentication for security.

## Features
- **Admin Authentication**: Secure login with JWT tokens
- **Services Management**: Add, edit, delete, and feature services
- **Projects Management**: Manage gallery projects with categories
- **Blog Management**: Create and manage blog posts
- **Featured Content**: Mark content as featured to display on the main page
- **File Uploads**: Support for image uploads for all content types

## Setup Instructions

### 1. Database Setup
1. Install MongoDB on your system or use MongoDB Atlas (cloud)
2. Update the `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/artceiling
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

### 2. Installation
```bash
npm install
```

### 3. Running the Application

#### Option 1: Run Frontend and Backend Separately
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

#### Option 2: Run Both Together
```bash
npm run dev:full
```

### 4. Admin Access
1. Navigate to `http://localhost:5173/admin`
2. Login with:
   - **Email**: admin@admin.com
   - **Password**: admin@123

## Admin Dashboard Features

### Services Management
- Add new ceiling design services
- Upload service images
- Edit existing service descriptions
- Mark services as "featured" to display on the main page
- Delete services

### Projects Management
- Add new project galleries
- Categorize projects (Luxury Ceiling, Modern Design, Traditional, etc.)
- Upload project images
- Mark projects as "featured"
- Edit and delete projects

### Blog Management
- Create new blog posts
- Add author information
- Upload featured images for posts
- Write content and excerpts
- Mark blogs as "featured"
- Edit and delete blog posts

### Featured Content
- Featured services, projects, and blogs appear on the main homepage
- The homepage displays interactive previews of featured content
- Only mark your best content as featured for maximum impact

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Services
- `GET /api/services` - Get all services
- `GET /api/services/featured` - Get featured services
- `POST /api/services` - Create new service (requires auth)
- `PUT /api/services/:id` - Update service (requires auth)
- `DELETE /api/services/:id` - Delete service (requires auth)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `POST /api/projects` - Create new project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/featured` - Get featured blogs
- `POST /api/blogs` - Create new blog (requires auth)
- `PUT /api/blogs/:id` - Update blog (requires auth)
- `DELETE /api/blogs/:id` - Delete blog (requires auth)

### Featured Content
- `GET /api/featured` - Get all featured content (services, projects, blogs)

## File Uploads
- Images are stored in the `uploads/` directory
- Supported formats: JPG, PNG, GIF, WebP
- Images are automatically served at `http://localhost:5000/uploads/filename`

## Contact Page Features
- Added Google Maps integration showing Mumbai location
- Contact form for user inquiries
- Business hours and contact information

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- File upload validation
- CORS enabled for frontend-backend communication

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct
2. **Admin Login Not Working**: Check if the admin user was created (happens automatically on server start)
3. **Images Not Loading**: Ensure the backend server is running on port 5000
4. **CORS Errors**: Make sure both frontend and backend are running

### Reset Admin Password
If you need to reset the admin password, you can modify the `initializeAdmin` function in `server.js` and restart the server.

## Development Notes
- The admin interface is responsive and works on mobile devices
- All forms include proper validation and error handling
- The system gracefully falls back to default content if the backend is unavailable
- Images are automatically optimized for web display

## Production Deployment
1. Set up a production MongoDB database
2. Update environment variables for production
3. Build the frontend: `npm run build`
4. Deploy both frontend and backend to your hosting provider
5. Update the API URLs in the frontend components for production

## Support
For any issues or questions, refer to the code comments or modify the admin credentials as needed.