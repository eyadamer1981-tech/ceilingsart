# Frontend Migration Guide

This document explains how to update your frontend code to work with the new PHP backend instead of Next.js API routes.

## API Base URL Configuration

Create a configuration file for your API endpoints:

```javascript
// config/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

export default API_BASE_URL;
```

## Authentication Updates

### Login Function
Replace your existing login function:

```javascript
// utils/auth.js
import API_BASE_URL from '../config/api';

export const loginAdmin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  // Store token in localStorage
  localStorage.setItem('adminToken', data.token);

  return data;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
```

## Services API Updates

```javascript
// utils/servicesApi.js
import API_BASE_URL from '../config/api';
import { getAuthHeaders } from './auth';

export const getServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);
  return response.json();
};

export const getFeaturedServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services/featured`);
  return response.json();
};

export const getServiceCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/services/categories`);
  return response.json();
};

export const createService = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: formData, // FormData object for file upload
  });

  if (!response.ok) {
    throw new Error('Failed to create service');
  }

  return response.json();
};

export const updateService = async (id, serviceData) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    throw new Error('Failed to update service');
  }

  return response.json();
};

export const deleteService = async (id) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete service');
  }

  return response.json();
};
```

## Projects API Updates

```javascript
// utils/projectsApi.js
import API_BASE_URL from '../config/api';
import { getAuthHeaders } from './auth';

export const getProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  return response.json();
};

export const getProjectsLight = async () => {
  const response = await fetch(`${API_BASE_URL}/projects/light`);
  return response.json();
};

export const getFeaturedProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects/featured`);
  return response.json();
};

export const getProjectCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/projects/categories`);
  return response.json();
};

export const createProject = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create project');
  }

  return response.json();
};
```

## Blogs API Updates

```javascript
// utils/blogsApi.js
import API_BASE_URL from '../config/api';
import { getAuthHeaders } from './auth';

export const getBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  return response.json();
};

export const getFeaturedBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs/featured`);
  return response.json();
};

export const createBlog = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create blog');
  }

  return response.json();
};
```

## Form Data Handling

For file uploads, you'll need to update your form submission logic:

```javascript
// Example: Service creation form
const handleServiceSubmit = async (formData) => {
  const form = new FormData();

  // Add text fields
  form.append('title', formData.title);
  form.append('descriptionEn', formData.descriptionEn);
  form.append('descriptionAr', formData.descriptionAr);
  form.append('category', formData.category);
  form.append('featured', formData.featured);

  // Add main image file
  if (formData.imageFile) {
    form.append('image', formData.imageFile);
  }

  // Add detail images
  if (formData.detailImageFiles) {
    formData.detailImageFiles.forEach((file, index) => {
      form.append(`detailImages`, file);
    });
  }

  try {
    const result = await createService(form);
    console.log('Service created:', result);
  } catch (error) {
    console.error('Error creating service:', error);
  }
};
```

## Image Handling

Update image URL handling since images are now served from `/uploads/`:

```javascript
// utils/imageUtils.js
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // If it's a base64 data URL, return as is
  if (imagePath.startsWith('data:')) {
    return imagePath;
  }

  // Otherwise, construct URL for PHP backend
  return `${window.location.origin}/uploads/${imagePath}`;
};
```

## Error Handling

Update error handling for the new API responses:

```javascript
// utils/errorHandler.js
export const handleApiError = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

// Usage example
export const getServicesWithErrorHandling = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    return await handleApiError(response);
  } catch (error) {
    console.error('Failed to fetch services:', error.message);
    throw error;
  }
};
```

## Environment Variables

Update your `.env.local` file:

```bash
# Remove MongoDB variables
# MONGODB_URI=mongodb://localhost:27017/artceiling

# Add PHP API URL
NEXT_PUBLIC_API_URL=http://localhost/api

# Keep other variables
JWT_SECRET=your_jwt_secret
```

## Component Updates

Update your React components to use the new API functions:

```javascript
// components/ServicesManager.jsx
import { useState, useEffect } from 'react';
import { getServices, createService, deleteService } from '../utils/servicesApi';
import { getImageUrl } from '../utils/imageUtils';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async (formData) => {
    try {
      await createService(formData);
      await fetchServices(); // Refresh list
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          <h3>{service.title}</h3>
          <img src={getImageUrl(service.image)} alt={service.title} />
          {/* ... rest of component */}
        </div>
      ))}
    </div>
  );
};
```

## Testing the Migration

1. Start your PHP backend server
2. Update API URLs in your frontend
3. Test all CRUD operations
4. Verify file uploads work correctly
5. Check that images display properly
6. Test admin authentication

## Common Issues and Solutions

1. **CORS Errors**: Update the CORS configuration in `api/config/cors.php`
2. **Image Not Loading**: Check the `getImageUrl` function and file paths
3. **Authentication Issues**: Verify token storage and header format
4. **Form Submission Errors**: Ensure FormData is properly constructed for file uploads

Remember to thoroughly test all functionality after migration to ensure everything works as expected with the new PHP backend.