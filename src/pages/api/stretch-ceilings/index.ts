import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { StretchCeiling, Project } from '../../../lib/models';
import multer from 'multer';

// Use memory storage to keep files in RAM and store in MongoDB
const upload = multer({ storage: multer.memoryStorage() });

function bufferToDataUrl(file: Express.Multer.File) {
  const mime = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

// Middleware to verify JWT token
const verifyToken = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    (req as any).admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const dbConnection = await connectDB();
      
      if (!dbConnection) {
        return res.json([]);
      }
      
      // Set cache headers for 10 minutes
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');

      const stretchCeilings = await StretchCeiling.find().sort({ createdAt: -1 });
      res.json(stretchCeilings);
    } catch (error) {
      console.error('Stretch Ceilings API error:', error);
      res.json([]);
    }
  } else if (req.method === 'POST') {
    // Handle file upload (main image + up to 3 detail images)
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'detailImages', maxCount: 3 },
    ])(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
        const { titleEn, titleAr, descriptionEn, descriptionAr, featured } = req.body;
        const files = (req as any).files || {};
        const mainImageFile = files.image?.[0];
        const detailImagesFiles = files.detailImages || [];

        const image = mainImageFile ? bufferToDataUrl(mainImageFile) : '';
        const detailImages = detailImagesFiles.map((f: Express.Multer.File) => bufferToDataUrl(f));
        
        if (!titleEn || !titleAr || !descriptionEn || !descriptionAr) {
          return res.status(400).json({ message: 'Missing required fields (titleEn, titleAr, descriptionEn, descriptionAr).' });
        }
        if (!image) {
          return res.status(400).json({ message: 'Main image is required.' });
        }

        // Create stretch ceiling
        const stretchCeiling = new StretchCeiling({
          titleEn,
          titleAr,
          descriptionEn,
          descriptionAr,
          image,
          detailImages,
          featured: featured === 'true',
        });

        await stretchCeiling.save();

        // Also add to projects collection
        const project = new Project({
          titleEn,
          titleAr,
          descriptionEn,
          descriptionAr,
          image,
          detailImages,
          category: 'Stretch Ceilings',
          featured: featured === 'true',
        });

        await project.save();

        res.status(201).json(stretchCeiling);
      } catch (error: any) {
        res.status(500).json({ message: error?.message || 'Server error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
