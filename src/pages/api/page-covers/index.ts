import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { PageCover } from '../../../lib/models';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Helper function to run multer middleware
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
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
      // Check authentication
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      // Run multer middleware
      await runMiddleware(req, res, upload.single('image'));

      const { pageType, coverType = 'hero' } = req.body;
      const file = (req as any).file;

      if (!file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      if (!pageType || !['home', 'aboutus', 'acousticpanel', 'stretchceiling', 'ourwork'].includes(pageType)) {
        return res.status(400).json({ message: 'Invalid page type' });
      }

      // Generate unique filename
      const fileExtension = path.extname(file.originalname);
      const fileName = `${pageType}-cover-${Date.now()}${fileExtension}`;
      const filePath = path.join('uploads', fileName);

      // Move file to final location
      fs.renameSync(file.path, filePath);

      // Check if page cover already exists
      const existingCover = await PageCover.findOne({ pageType, coverType });
      
      if (existingCover) {
        // Update existing cover
        existingCover.title = `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} ${coverType.charAt(0).toUpperCase() + coverType.slice(1)} Cover`;
        existingCover.image = `/uploads/${fileName}`;
        existingCover.updatedAt = new Date();
        await existingCover.save();
        
        res.json(existingCover);
      } else {
        // Create new cover
        const pageCover = new PageCover({
          pageType,
          coverType,
          title: `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} ${coverType.charAt(0).toUpperCase() + coverType.slice(1)} Cover`,
          image: `/uploads/${fileName}`,
        });
        
        await pageCover.save();
        res.json(pageCover);
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
