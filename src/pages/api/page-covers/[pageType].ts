import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { PageCover } from '../../../lib/models';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbConnection = await connectDB();
  
  if (!dbConnection) {
    return res.status(500).json({ message: 'Database connection failed' });
  }

  if (req.method === 'DELETE') {
    try {
      // Check authentication
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const { pageType, coverType } = req.query;

      if (!pageType || !['home', 'aboutus', 'acousticpanel', 'stretchceiling', 'ourwork'].includes(pageType as string)) {
        return res.status(400).json({ message: 'Invalid page type' });
      }

      // For home page, coverType is required. For other pages, we don't use coverType
      let query: any = { pageType };
      if (pageType === 'home' && coverType) {
        query.coverType = coverType;
      } else if (pageType !== 'home') {
        query.coverType = { $exists: false };
      }

      const pageCover = await PageCover.findOne(query);

      if (!pageCover) {
        return res.status(404).json({ message: 'Page cover not found' });
      }

      // Delete the image file if it exists
      if (pageCover.image) {
        const imagePath = path.join(process.cwd(), 'public', pageCover.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Delete from database
      await PageCover.findByIdAndDelete(pageCover._id);

      res.json({ message: 'Page cover deleted successfully' });
    } catch (error) {
      console.error('Error deleting page cover:', error);
      res.status(500).json({ message: 'Error deleting page cover' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
