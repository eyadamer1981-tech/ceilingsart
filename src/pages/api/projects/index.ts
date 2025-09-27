import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Project } from '../../../lib/models';
// Lazy-load multer only for POST to avoid issues affecting GET imports

function bufferToDataUrl(file: any) {
  const mime = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Fall back: read without sort to avoid memory limit
      const projects = await Project.find();
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
        const { title, descriptionEn, descriptionAr, category, featured } = req.body;
        const files = (req as any).files || {};
        const mainImageFile = files.image?.[0];
        const detailImagesFiles = files.detailImages || [];

        const image = mainImageFile ? bufferToDataUrl(mainImageFile) : '';
        const detailImages = detailImagesFiles.map((f: any) => bufferToDataUrl(f));

        const project = new Project({
          title,
          descriptionEn,
          descriptionAr,
          category,
          image,
          detailImages,
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
