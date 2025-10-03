import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { CustomSlider, Project } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const sliders = await CustomSlider.find({ isActive: true })
          .populate('projectIds', 'title image category')
          .sort({ order: 1, createdAt: -1 });
        
        res.json(sliders);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    case 'POST':
      try {
        const { title, description, projectIds, order } = req.body;
        
        if (!title || !projectIds || !Array.isArray(projectIds)) {
          return res.status(400).json({ message: 'Title and projectIds are required' });
        }

        // Verify that all project IDs exist
        const existingProjects = await Project.find({ _id: { $in: projectIds } });
        if (existingProjects.length !== projectIds.length) {
          return res.status(400).json({ message: 'Some project IDs are invalid' });
        }

        const slider = new CustomSlider({
          title,
          description: description || '',
          projectIds,
          order: order || 0,
          isActive: true
        });

        await slider.save();
        await slider.populate('projectIds', 'title image category');
        
        res.status(201).json(slider);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
