import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { AcousticPanel, Project } from '../../../lib/models';
import multer from 'multer';
import { getGridFSBucket } from '../../../lib/gridfs';
import { Readable } from 'stream';

// Use memory storage to keep files in RAM, then store in MongoDB GridFS
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const dbConnection = await connectDB();
      if (!dbConnection) return res.json([]);

      // Cache public GETs for 10 minutes
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');

      const panels = await AcousticPanel.find().sort({ createdAt: -1 });
      res.json(panels);
    } catch (error) {
      console.error('Acoustic Panels API (GET) error:', error);
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
        const { titleEn, titleAr, descriptionEn, descriptionAr, featured, rightLeftSection } = req.body as any;
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

        // Create acoustic panel
        const panel = new AcousticPanel({
          titleEn,
          titleAr,
          descriptionEn,
          descriptionAr,
          image: mainStored ? mainStored.url : '',
          imageId: mainStored ? mainStored.id : undefined,
          detailImages: detailStored.map((d) => d.url),
          detailImageIds: detailStored.map((d) => d.id),
          featured: featured === 'true' || featured === true,
          rightLeftSection: rightLeftSection === 'true' || rightLeftSection === true,
        });

        await panel.save();

        // Also add to projects collection for gallery use
        const project = new Project({
          titleEn,
          titleAr,
          descriptionEn,
          descriptionAr,
          image: mainStored ? mainStored.url : '',
          imageId: mainStored ? mainStored.id : undefined,
          detailImages: detailStored.map((d) => d.url),
          detailImageIds: detailStored.map((d) => d.id),
          category: 'Acoustic Panels',
          featured: featured === 'true' || featured === true,
        });

        await project.save();

        res.status(201).json(panel);
      } catch (error: any) {
        console.error('Acoustic Panels API (POST) error:', error);
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

