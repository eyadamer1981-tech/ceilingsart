import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog } from '../../../lib/models';
import multer from 'multer';

// Use memory storage to keep files in RAM and store in MongoDB
const upload = multer({ storage: multer.memoryStorage() });

function bufferToDataUrl(file: multer.File) {
  const mime = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Return only the latest 8 blogs
      const blogs = await Blog.find().sort({ createdAt: -1 }).limit(8);
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'POST') {
    // Handle file upload
    upload.single('image')(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
        // Enforce a maximum of 8 blogs total
        const totalBlogs = await Blog.countDocuments();
        if (totalBlogs >= 8) {
          return res.status(400).json({
            message: 'Maximum of 8 blogs reached. Please delete an old blog to create a new one.',
          });
        }

        const { title, content, excerpt, author, featured } = req.body;
        const image = (req as any).file ? bufferToDataUrl((req as any).file) : '';

        const blog = new Blog({
          title,
          content,
          excerpt,
          author,
          image,
          featured: featured === 'true',
        });

        await blog.save();
        res.status(201).json(blog);
      } catch (error) {
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
