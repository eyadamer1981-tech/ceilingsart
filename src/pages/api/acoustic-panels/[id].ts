import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { AcousticPanel, Project } from '../../../lib/models';
import multer from 'multer';

// Use memory storage to keep files in RAM and store in MongoDB
const upload = multer({ storage: multer.memoryStorage() });

function bufferToDataUrl(file: Express.Multer.File) {
  const mime = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid acoustic panel ID' });
  }

  try {
    const dbConnection = await connectDB();
    
    if (!dbConnection) {
      return res.status(500).json({ message: 'Database connection failed' });
    }

    if (req.method === 'PUT') {
      // Handle file upload (main image + up to 3 detail images)
      upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'detailImages', maxCount: 3 },
      ])(req as any, res as any, async (err: any) => {
        if (err) {
          return res.status(400).json({ message: 'File upload error' });
        }

        try {
          const { titleEn, titleAr, descriptionEn, descriptionAr, featured, rightLeftSection } = req.body;
          const files = (req as any).files || {};
          const mainImageFile = files.image?.[0];
          const detailImagesFiles = files.detailImages || [];

          const updateData: any = {
            titleEn,
            titleAr,
            descriptionEn,
            descriptionAr,
            featured: featured === 'true',
            rightLeftSection: rightLeftSection === 'true',
          };

          if (mainImageFile) {
            updateData.image = bufferToDataUrl(mainImageFile);
          }

          if (detailImagesFiles.length > 0) {
            updateData.detailImages = detailImagesFiles.map((f: Express.Multer.File) => bufferToDataUrl(f));
          }

          const acousticPanel = await AcousticPanel.findByIdAndUpdate(id, updateData, { new: true });
          
          if (!acousticPanel) {
            return res.status(404).json({ message: 'Acoustic panel not found' });
          }

          // Also update the corresponding project
          const projectUpdateData: any = {
            titleEn,
            titleAr,
            descriptionEn,
            descriptionAr,
            featured: featured === 'true',
          };

          if (mainImageFile) {
            projectUpdateData.image = bufferToDataUrl(mainImageFile);
          }

          if (detailImagesFiles.length > 0) {
            projectUpdateData.detailImages = detailImagesFiles.map((f: Express.Multer.File) => bufferToDataUrl(f));
          }

          await Project.findOneAndUpdate(
            { 
              titleEn: acousticPanel.titleEn,
              category: 'Acoustic Panels'
            },
            projectUpdateData
          );

          res.json(acousticPanel);
        } catch (error: any) {
          res.status(500).json({ message: error?.message || 'Server error' });
        }
      });
    } else if (req.method === 'DELETE') {
      const acousticPanel = await AcousticPanel.findByIdAndDelete(id);
      
      if (!acousticPanel) {
        return res.status(404).json({ message: 'Acoustic panel not found' });
      }

      // Also delete the corresponding project
      await Project.findOneAndDelete({
        titleEn: acousticPanel.titleEn,
        category: 'Acoustic Panels'
      });

      res.json({ message: 'Acoustic panel deleted successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error?.message || 'Server error' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
