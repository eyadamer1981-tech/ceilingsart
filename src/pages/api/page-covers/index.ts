import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { PageCover } from '../../../lib/models';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads - use memory storage for Vercel compatibility
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('Multer fileFilter - File info:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      fieldname: file.fieldname
    });
    
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    console.log('Multer fileFilter - Validation:', {
      extname: extname,
      mimetype: mimetype,
      allowed: mimetype && extname
    });

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      const error = new Error('Only image files are allowed');
      console.error('Multer fileFilter - Error:', error.message);
      cb(error);
    }
  },
});

// Helper function to run multer middleware
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        console.error('Multer middleware error:', result);
        return reject(result);
      }
      console.log('Multer middleware completed successfully');
      return resolve(result);
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbConnection = await connectDB();
  
  if (!dbConnection) {
    return res.status(500).json({ message: 'Database connection failed' });
  }

  if (req.method === 'GET') {
    try {
      const { pageType, coverType } = req.query;
      
      let query = {};
      if (pageType) query = { ...query, pageType };
      if (coverType) query = { ...query, coverType };
      
      const pageCovers = await PageCover.find(query).sort({ pageType: 1, coverType: 1 });
      res.json(pageCovers);
    } catch (error) {
      console.error('Error fetching page covers:', error);
      res.status(500).json({ message: 'Error fetching page covers' });
    }
  } else if (req.method === 'POST') {
    try {
      console.log('Page covers API - POST request received');
      
      // Check authentication
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      // Verify JWT token
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
        (req as any).admin = decoded;
      } catch (jwtError) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Run multer middleware
      console.log('Page covers API - Running multer middleware');
      await runMiddleware(req, res, upload.single('image'));
      console.log('Page covers API - Multer middleware completed');

      const { pageType, coverType = 'hero' } = req.body;
      const file = (req as any).file;
      console.log('Page covers API - Extracted data:', { pageType, coverType });
      console.log('Page covers API - File received:', file ? { name: file.originalname, size: file.size } : 'No file');
      

      if (!file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      if (!pageType || !['home', 'aboutus', 'acousticpanel', 'stretchceiling', 'ourwork'].includes(pageType)) {
        return res.status(400).json({ message: 'Invalid page type' });
      }

      // Validate cover type
      const validCoverTypes = ['hero', 'about', 'services', 'stretchCeilings', 'acousticPanels'];
      if (coverType && !validCoverTypes.includes(coverType)) {
        return res.status(400).json({ message: 'Invalid cover type' });
      }

      // Generate unique filename
      const fileExtension = path.extname(file.originalname);
      const fileName = `${pageType}-cover-${Date.now()}${fileExtension}`;
      
      // For Vercel compatibility, we'll store the file data directly
      // In production, you might want to use a cloud storage service like AWS S3, Cloudinary, etc.
      // For now, we'll create a base64 data URL for the image
      const base64Data = file.buffer.toString('base64');
      const dataUrl = `data:${file.mimetype};base64,${base64Data}`;
      
      // Store the file reference (in a real production app, you'd upload to cloud storage)
      const fileReference = `/uploads/${fileName}`;

      // Check if page cover already exists
      console.log('Page covers API - Checking for existing cover:', { pageType, coverType });
      try {
        const existingCover = await PageCover.findOne({ pageType, coverType });
        console.log('Page covers API - Existing cover found:', existingCover ? 'Yes' : 'No');
        
        if (existingCover) {
          // Update existing cover
          console.log('Page covers API - Updating existing cover');
          existingCover.title = `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} ${coverType.charAt(0).toUpperCase() + coverType.slice(1)} Cover`;
          existingCover.image = dataUrl; // Use data URL for Vercel compatibility
          existingCover.updatedAt = new Date();
          await existingCover.save();
          console.log('Page covers API - Existing cover updated successfully');
          
          res.json(existingCover);
        } else {
          // Create new cover
          console.log('Page covers API - Creating new cover');
          const pageCover = new PageCover({
            pageType,
            coverType,
            title: `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} ${coverType.charAt(0).toUpperCase() + coverType.slice(1)} Cover`,
            image: dataUrl, // Use data URL for Vercel compatibility
          });
          
          await pageCover.save();
          console.log('Page covers API - New cover created successfully');
          res.json(pageCover);
        }
      } catch (dbError) {
        console.error('Database error saving page cover:', dbError);
        return res.status(500).json({ message: 'Error saving page cover to database' });
      }
    } catch (error) {
      console.error('Error saving page cover:', error);
      res.status(500).json({ message: 'Error saving page cover' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Disable body parsing for this route since we're using multer
export const config = {
  api: {
    bodyParser: false,
  },
};
