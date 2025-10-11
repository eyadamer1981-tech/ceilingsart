import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Project } from '../../../lib/models';
import { getGridFSBucket } from '../../../lib/gridfs';
import { Readable } from 'stream';
// Lazy-load multer only for POST to avoid issues affecting GET imports

// Back-compat note: We will now store files in GridFS and set the image fields
// to stable URLs under /api/images/[id], while also storing imageId(s).
async function storeInGridFS(file: any): Promise<{ id: any; url: string }> {
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
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Set cache headers for 10 minutes
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');

      const { category, limit, fields } = req.query;
      
      // Build query filter
      const filter: any = {};
      if (category && typeof category === 'string' && category.trim()) {
        filter.category = category;
      }

      // Limit results to prevent massive responses
      const maxLimit = Math.min(100, parseInt((limit as string) || '50', 10));
      
      // Select only necessary fields to reduce response size
      let selectFields = 'title titleEn titleAr image category descriptionEn descriptionAr detailImages featured createdAt';
      if (fields && typeof fields === 'string') {
        selectFields = fields;
      }

      const projects = await Project.find(filter)
        .select(selectFields)
        .limit(maxLimit)
        .lean(); // Use lean() for better performance
      
      res.json(projects);
    } catch (error) {
      console.error('GET /api/projects error:', error);
      res.status(500).json({ message: 'Server error', detail: (error as any)?.message || 'unknown' });
    }
  } else if (req.method === 'POST') {
    const multer = require('multer');
    const upload = multer({ storage: multer.memoryStorage() });
    // Handle file upload (main image + up to 3 detail images)
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'detailImages', maxCount: 3 },
    ])(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
        const { titleEn, titleAr, descriptionEn, descriptionAr, category, featured } = req.body;
        const files = (req as any).files || {};
        const mainImageFile = files.image?.[0];
        const detailImagesFiles = files.detailImages || [];

        // Save files to GridFS
        const mainStored = mainImageFile ? await storeInGridFS(mainImageFile) : null;
        const detailStored = await Promise.all(
          detailImagesFiles.map(async (f: any) => await storeInGridFS(f))
        );

        const project = new Project({
          titleEn,
          titleAr,
          descriptionEn,
          descriptionAr,
          category,
          image: mainStored ? mainStored.url : '',
          imageId: mainStored ? mainStored.id : undefined,
          detailImages: detailStored.map((d) => d.url),
          detailImageIds: detailStored.map((d) => d.id),
          featured: featured === 'true',
        });

        await project.save();
        res.status(201).json(project);
      } catch (error) {
        console.error('POST /api/projects error:', error);
        res.status(500).json({ message: 'Server error' });
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
