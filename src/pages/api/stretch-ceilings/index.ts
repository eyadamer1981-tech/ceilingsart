import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { StretchCeiling, Project } from '../../../lib/models';
import multer from 'multer';
import { getGridFSBucket } from '../../../lib/gridfs';
import { Readable } from 'stream';

// Use memory storage to keep files in RAM and store in MongoDB
const upload = multer({ storage: multer.memoryStorage() });

async function storeInGridFS(file: Express.Multer.File): Promise<{ id: any; url: string }> {
  const bucket = await getGridFSBucket();
  const uploadStream = bucket.openUploadStream(file.originalname || 'upload', {
    contentType: file.mimetype || 'application/octet-stream',
    metadata: { size: file.size }
  });
  await new Promise<void>((resolve, reject) => {
    Readable.from(file.buffer)
      .pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => resolve());
  });
  const id = uploadStream.id;
  const url = `/api/images/${id}`;
  return { id, url };
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

      const stretchCeilings = await StretchCeiling.find().select('titleEn titleAr descriptionEn descriptionAr image detailImages features benefits applications specifications featured createdAt').sort({ createdAt: -1 });
      res.json(stretchCeilings);
    } catch (error) {
      console.error('Stretch Ceilings API error:', error);
      res.json([]);
    }
  } else if (req.method === 'POST') {
    // Handle file upload (main image + up to 6 detail images)
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'detailImages', maxCount: 6 },
    ])(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
        const { titleEn, titleAr, descriptionEn, descriptionAr, featured } = req.body;
        // Optional JSON fields for detailed sections
        const featuresRaw = (req.body as any).features;
        const benefitsRaw = (req.body as any).benefits;
        const applicationsRaw = (req.body as any).applications;
        const specificationsRaw = (req.body as any).specifications;
        const files = (req as any).files || {};
        const mainImageFile = files.image?.[0];
        const detailImagesFiles = files.detailImages || [];

        const mainStored = mainImageFile ? await storeInGridFS(mainImageFile) : null;
        const detailStored = await Promise.all(
          detailImagesFiles.map(async (f: Express.Multer.File) => await storeInGridFS(f))
        );
        
        if (!titleEn || !titleAr || !descriptionEn || !descriptionAr) {
          return res.status(400).json({ message: 'Missing required fields (titleEn, titleAr, descriptionEn, descriptionAr).' });
        }
        if (!mainStored || !mainStored.url) {
          return res.status(400).json({ message: 'Main image is required.' });
        }

        // Parse optional arrays/objects if provided
        const parseJson = (val: any) => {
          if (!val) return undefined;
          try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return undefined; }
        };
        const features = parseJson(featuresRaw);
        const benefits = parseJson(benefitsRaw);
        const applications = parseJson(applicationsRaw);
        const specifications = parseJson(specificationsRaw);

        // Create stretch ceiling
        const stretchCeiling = new StretchCeiling({
          titleEn,
          titleAr,
          descriptionEn,
          descriptionAr,
          image: mainStored ? mainStored.url : '',
          imageId: mainStored ? mainStored.id : undefined,
          detailImages: detailStored.map((d) => d.url),
          detailImageIds: detailStored.map((d) => d.id),
          featured: featured === 'true',
          ...(Array.isArray(features) ? { features } : {}),
          ...(Array.isArray(benefits) ? { benefits } : {}),
          ...(Array.isArray(applications) ? { applications } : {}),
          ...(specifications && typeof specifications === 'object' ? { specifications } : {}),
        });

        await stretchCeiling.save();

        // Also add to projects collection
        const project = new Project({
          titleEn,
          titleAr,
          descriptionEn,
          descriptionAr,
          image: mainStored ? mainStored.url : '',
          imageId: mainStored ? mainStored.id : undefined,
          detailImages: detailStored.map((d) => d.url),
          detailImageIds: detailStored.map((d) => d.id),
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
