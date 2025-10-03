import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog } from '../../../lib/models';
import multer from 'multer';

// Use memory storage and store as data URL in MongoDB
const upload = multer({ storage: multer.memoryStorage() });

function bufferToDataUrl(file: multer.File) {
  const mime = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'PUT') {
    // Handle file upload
    upload.single('image')(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
        const { title, content, excerpt, author, featured } = req.body;
        const updateData: any = {
          title,
          content,
          excerpt,
          author,
          featured: featured === 'true',
        };

        if ((req as any).file) {
          updateData.image = bufferToDataUrl((req as any).file);
        }

        const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        res.json(blog);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      await Blog.findByIdAndDelete(id);
      res.json({ message: 'Blog deleted successfully' });
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
