import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { AcousticPanel, Project } from '../../../lib/models';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

function bufferToDataUrl(file: Express.Multer.File) {
  const mime = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (req.method === 'PUT') {
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'detailImages', maxCount: 3 },
    ])(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
        await connectDB();

        const { titleEn, titleAr, descriptionEn, descriptionAr, featured, rightLeftSection } = req.body as any;
        const files = (req as any).files || {};
        const mainImageFile = files.image?.[0];
        const detailImagesFiles = files.detailImages || [];

        const updates: any = {
          ...(titleEn ? { titleEn } : {}),
          ...(titleAr ? { titleAr } : {}),
          ...(descriptionEn ? { descriptionEn } : {}),
          ...(descriptionAr ? { descriptionAr } : {}),
        };

        if (typeof featured !== 'undefined') updates.featured = featured === 'true' || featured === true;
        if (typeof rightLeftSection !== 'undefined') updates.rightLeftSection = rightLeftSection === 'true' || rightLeftSection === true;

        if (mainImageFile) {
          updates.image = bufferToDataUrl(mainImageFile);
        }
        if (detailImagesFiles && detailImagesFiles.length > 0) {
          updates.detailImages = detailImagesFiles.map((f: Express.Multer.File) => bufferToDataUrl(f));
        }

        const panel = await AcousticPanel.findByIdAndUpdate(id, updates, { new: true });
        if (!panel) return res.status(404).json({ message: 'Panel not found' });

        // Best-effort sync to matching project (by title and category)
        await Project.updateMany(
          { category: 'Acoustic Panels', titleEn: panel.titleEn, titleAr: panel.titleAr },
          {
            $set: {
              titleEn: panel.titleEn,
              titleAr: panel.titleAr,
              descriptionEn: panel.descriptionEn,
              descriptionAr: panel.descriptionAr,
              image: panel.image,
              detailImages: panel.detailImages,
              featured: panel.featured,
            },
          }
        );

        res.json(panel);
      } catch (error: any) {
        console.error('Acoustic Panels API (PUT) error:', error);
        res.status(500).json({ message: error?.message || 'Server error' });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      await connectDB();

      const panel = await AcousticPanel.findByIdAndDelete(id);
      if (!panel) return res.status(404).json({ message: 'Panel not found' });

      // Best-effort: remove associated projects with the same title/category
      await Project.deleteMany({ category: 'Acoustic Panels', titleEn: panel.titleEn, titleAr: panel.titleAr });

      res.status(204).end();
    } catch (error: any) {
      console.error('Acoustic Panels API (DELETE) error:', error);
      res.status(500).json({ message: error?.message || 'Server error' });
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

