import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import { Service, Project, Blog } from '../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const featuredServices = await Service.find({ featured: true }).limit(3);
      const featuredProjects = await Project.find({ featured: true }).limit(3);
      const featuredBlogs = await Blog.find({ featured: true }).limit(3);

      res.json({
        services: featuredServices,
        projects: featuredProjects,
        blogs: featuredBlogs,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
