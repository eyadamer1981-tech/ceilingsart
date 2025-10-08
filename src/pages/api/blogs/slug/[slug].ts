import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/mongodb';
import { Blog } from '../../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findOne({ slug });

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.json(blog);
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
