import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { CustomSlider, Project } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Slider ID is required' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const slider = await CustomSlider.findById(id).populate('projectIds', 'title image category');
        if (!slider) {
          return res.status(404).json({ message: 'Slider not found' });
        }
        res.json(slider);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    case 'PUT':
      try {
        const { title, description, projectIds, order, isActive } = req.body;
        
        const slider = await CustomSlider.findById(id);
        if (!slider) {
          return res.status(404).json({ message: 'Slider not found' });
        }

        // If projectIds are being updated, verify they exist
        if (projectIds && Array.isArray(projectIds)) {
          const existingProjects = await Project.find({ _id: { $in: projectIds } });
          if (existingProjects.length !== projectIds.length) {
            return res.status(400).json({ message: 'Some project IDs are invalid' });
          }
          slider.projectIds = projectIds;
        }

        if (title !== undefined) slider.title = title;
        if (description !== undefined) slider.description = description;
        if (order !== undefined) slider.order = order;
        if (isActive !== undefined) slider.isActive = isActive;
        
        slider.updatedAt = new Date();
        await slider.save();
        await slider.populate('projectIds', 'title image category');
        
        res.json(slider);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    case 'DELETE':
      try {
        const slider = await CustomSlider.findById(id);
        if (!slider) {
          return res.status(404).json({ message: 'Slider not found' });
        }

        await CustomSlider.findByIdAndDelete(id);
        res.json({ message: 'Slider deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
