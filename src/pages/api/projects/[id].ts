import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Project } from '../../../lib/models';
import { getGridFSBucket } from '../../../lib/gridfs';
import { Readable } from 'stream';

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

  const { id } = req.query;

  if (req.method === 'PUT') {
    const multer = require('multer');
    const upload = multer({ storage: multer.memoryStorage() });
    
    // Handle file upload (main image + optional detail images)
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

        const updateData: any = {
          titleEn,
          titleAr,
          descriptionEn,
          descriptionAr,
          category,
          featured: featured === 'true',
        };

        // Save files to GridFS if provided
        if (mainImageFile) {
          const mainStored = await storeInGridFS(mainImageFile);
          updateData.image = mainStored.url;
          updateData.imageId = mainStored.id;
        }
        
        if (detailImagesFiles.length > 0) {
          const detailStored = await Promise.all(
            detailImagesFiles.map(async (f: any) => await storeInGridFS(f))
          );
          updateData.detailImages = detailStored.map((d) => d.url);
          updateData.detailImageIds = detailStored.map((d) => d.id);
        }

        const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
        res.json(project);
      } catch (error) {
        console.error('PUT /api/projects/[id] error:', error);
        res.status(500).json({ message: 'Server error', detail: (error as any)?.message || 'unknown' });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      await Project.findByIdAndDelete(id);
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('DELETE /api/projects/[id] error:', error);
      res.status(500).json({ message: 'Server error', detail: (error as any)?.message || 'unknown' });
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
