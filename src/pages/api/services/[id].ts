import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Service } from '../../../lib/models';
import multer from 'multer';

// Use memory storage and store as data URL in MongoDB
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
  await connectDB();

  const { id } = req.query;

  if (req.method === 'PUT') {
    // Handle file upload (main image + optional detail images)
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'detailImages', maxCount: 3 },
    ])(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
        const { title, descriptionEn, descriptionAr, category, featured } = req.body;
        const files = (req as any).files || {};
        const mainImageFile = files.image?.[0];
        const detailImagesFiles = files.detailImages || [];

        const updateData: any = {
          title,
          descriptionEn,
          descriptionAr,
          category,
          featured: featured === 'true',
        };

        if (mainImageFile) {
          updateData.image = bufferToDataUrl(mainImageFile);
        }
        if (detailImagesFiles.length > 0) {
          updateData.detailImages = detailImagesFiles.map((f: Express.Multer.File) => bufferToDataUrl(f));
        }

        const service = await Service.findByIdAndUpdate(id, updateData, { new: true });
        res.json(service);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      await Service.findByIdAndDelete(id);
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
