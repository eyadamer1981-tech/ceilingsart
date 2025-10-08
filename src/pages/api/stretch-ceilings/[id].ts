import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { StretchCeiling, Project } from '../../../lib/models';
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
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid stretch ceiling ID' });
  }

  try {
    const dbConnection = await connectDB();
    
    if (!dbConnection) {
      return res.status(500).json({ message: 'Database connection failed' });
    }

    if (req.method === 'PUT') {
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
          const { titleEn, titleAr, descriptionEn, descriptionAr, featured } = req.body;
          // Optional JSON fields for detailed sections
          const featuresRaw = (req.body as any).features;
          const benefitsRaw = (req.body as any).benefits;
          const applicationsRaw = (req.body as any).applications;
          const specificationsRaw = (req.body as any).specifications;
          const files = (req as any).files || {};
          const mainImageFile = files.image?.[0];
          const detailImagesFiles = files.detailImages || [];

          const parseJson = (val: any) => {
            if (!val) return undefined;
            try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return undefined; }
          };

          const features = parseJson(featuresRaw);
          const benefits = parseJson(benefitsRaw);
          const applications = parseJson(applicationsRaw);
          const specifications = parseJson(specificationsRaw);

          const updateData: any = {
            titleEn,
            titleAr,
            descriptionEn,
            descriptionAr,
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

          if (Array.isArray(features)) updateData.features = features;
          if (Array.isArray(benefits)) updateData.benefits = benefits;
          if (Array.isArray(applications)) updateData.applications = applications;
          if (specifications && typeof specifications === 'object') updateData.specifications = specifications;

          const stretchCeiling = await StretchCeiling.findByIdAndUpdate(id, updateData, { new: true });
          
          if (!stretchCeiling) {
            return res.status(404).json({ message: 'Stretch ceiling not found' });
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
            projectUpdateData.image = updateData.image;
            projectUpdateData.imageId = updateData.imageId;
          }

          if (detailImagesFiles.length > 0) {
            projectUpdateData.detailImages = updateData.detailImages;
            projectUpdateData.detailImageIds = updateData.detailImageIds;
          }

          await Project.findOneAndUpdate(
            { 
              titleEn: stretchCeiling.titleEn,
              category: 'Stretch Ceilings'
            },
            projectUpdateData
          );

          res.json(stretchCeiling);
        } catch (error: any) {
          console.error('Stretch Ceilings API (PUT) error:', error);
          res.status(500).json({ message: error?.message || 'Server error' });
        }
      });
    } else if (req.method === 'DELETE') {
      const stretchCeiling = await StretchCeiling.findByIdAndDelete(id);
      
      if (!stretchCeiling) {
        return res.status(404).json({ message: 'Stretch ceiling not found' });
      }

      // Also delete the corresponding project
      await Project.findOneAndDelete({
        titleEn: stretchCeiling.titleEn,
        category: 'Stretch Ceilings'
      });

      res.json({ message: 'Stretch ceiling deleted successfully' });
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
