import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Project } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Set cache headers for 5 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');

    const { 
      currentTitle, 
      currentTitleEn, 
      currentTitleAr, 
      category, 
      limit = '3' 
    } = req.query;

    if (!currentTitle && !currentTitleEn && !currentTitleAr) {
      return res.status(400).json({ message: 'Current title is required' });
    }

    const maxLimit = Math.min(10, parseInt(limit as string, 10));
    
    // Build exclusion filter for current item
    const excludeFilter: any = {
      $and: []
    };

    // Exclude current item by title matching
    const titleConditions: any[] = [];
    if (currentTitle) titleConditions.push({ title: currentTitle });
    if (currentTitleEn) titleConditions.push({ titleEn: currentTitleEn });
    if (currentTitleAr) titleConditions.push({ titleAr: currentTitleAr });
    
    if (titleConditions.length > 0) {
      excludeFilter.$and.push({ $nor: titleConditions });
    }

    // Build category filter
    const filter: any = { ...excludeFilter };
    if (category && typeof category === 'string' && category.trim()) {
      filter.category = category;
    }

    // Get related projects with minimal fields
    const relatedProjects = await Project.find(filter)
      .select('title titleEn titleAr image category')
      .limit(maxLimit * 3) // Get more to allow for shuffling
      .lean();

    // Simple client-side shuffling for variety
    const shuffled = relatedProjects.sort(() => Math.random() - 0.5);
    const result = shuffled.slice(0, maxLimit);

    res.json(result);
  } catch (error) {
    console.error('GET /api/projects/related error:', error);
    res.status(500).json({ message: 'Server error', detail: (error as any)?.message || 'unknown' });
  }
}
