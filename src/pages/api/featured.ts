import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import { AcousticPanel, StretchCeiling, Project, Blog } from '../../lib/models';
import { translateCategory } from '../../lib/translations';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const dbConnection = await connectDB();
      const { lang = 'en' } = req.query;
      
      if (!dbConnection) {
        // Return empty arrays if no database connection
        return res.json({
          acousticPanels: [],
          stretchCeilings: [],
          projects: [],
          blogs: [],
        });
      }
      
      const featuredAcousticPanels = await AcousticPanel.find({ featured: true }).limit(3);
      const featuredStretchCeilings = await StretchCeiling.find({ featured: true }).limit(3);
      const featuredProjects = await Project.find({ featured: true }).limit(3);
      const featuredBlogs = await Blog.find({ featured: true }).limit(3);

      // Transform data to include language-specific content
      const transformItem = (item: any) => {
        return {
          ...item.toObject(),
          title: lang === 'ar' ? item.titleAr : item.titleEn,
          description: lang === 'ar' ? item.descriptionAr : item.descriptionEn,
          // Translate category based on language
          category: translateCategory(item.category, lang as 'en' | 'ar')
        };
      };

      res.json({
        acousticPanels: featuredAcousticPanels.map(transformItem),
        stretchCeilings: featuredStretchCeilings.map(transformItem),
        projects: featuredProjects.map(transformItem),
        blogs: featuredBlogs.map(transformItem),
      });
    } catch (error) {
      console.error('Featured API error:', error);
      // Return empty arrays if database connection fails
      res.json({
        acousticPanels: [],
        stretchCeilings: [],
        projects: [],
        blogs: [],
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
