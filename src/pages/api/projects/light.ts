import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Project } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Set cache headers for 10 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');

    const { category } = req.query;
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const pageSize = Math.min(50, Math.max(1, parseInt((req.query.pageSize as string) || '24', 10)));

    const filter: any = {};
    if (category && typeof category === 'string' && category.trim()) {
      filter.category = category;
    }

    const total = await Project.countDocuments(filter);
    const items = await Project.find(filter)
      .select('title titleEn titleAr image category descriptionEn descriptionAr createdAt')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    res.json({ items, total, page, pageSize });
  } catch (error) {
    console.error('GET /api/projects/light error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



