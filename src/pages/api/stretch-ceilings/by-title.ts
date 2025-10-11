import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { StretchCeiling } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Set cache headers for 5 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');

    const { title, titleEn, titleAr, fields } = req.query;

    if (!title && !titleEn && !titleAr) {
      return res.status(400).json({ message: 'At least one title parameter is required' });
    }

    // Build search query for any matching title
    const searchQuery: any = {
      $or: []
    };

    if (title) searchQuery.$or.push({ title: title });
    if (titleEn) searchQuery.$or.push({ titleEn: titleEn });
    if (titleAr) searchQuery.$or.push({ titleAr: titleAr });

    // Select only necessary fields to reduce response size
    let selectFields = 'title titleEn titleAr image descriptionEn descriptionAr detailImages category featured createdAt';
    if (fields && typeof fields === 'string') {
      selectFields = fields;
    }

    const ceiling = await StretchCeiling.findOne(searchQuery)
      .select(selectFields)
      .lean();

    if (!ceiling) {
      return res.status(404).json({ message: 'Stretch ceiling not found' });
    }

    res.json(ceiling);
  } catch (error) {
    console.error('GET /api/stretch-ceilings/by-title error:', error);
    res.status(500).json({ message: 'Server error', detail: (error as any)?.message || 'unknown' });
  }
}

