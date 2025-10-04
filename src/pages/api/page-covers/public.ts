import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { PageCover } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { pageType, coverType } = req.query;
    
    let query: any = {};
    if (pageType) query.pageType = pageType;
    if (coverType) query.coverType = coverType;
    
    const pageCovers = await PageCover.find(query).sort({ pageType: 1, coverType: 1 });
    
    // Return covers in a format that's easy to use on frontend
    const coversByType: any = {};
    pageCovers.forEach(cover => {
      if (!coversByType[cover.pageType]) {
        coversByType[cover.pageType] = {};
      }
      coversByType[cover.pageType][cover.coverType || 'main'] = cover.image;
    });
    
    res.json(coversByType);
  } catch (error) {
    console.error('Error fetching page covers:', error);
    res.status(500).json({ message: 'Error fetching page covers' });
  }
}
