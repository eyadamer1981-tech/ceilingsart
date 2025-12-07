import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { InternalLinkMapping } from '../../../lib/models';
import { triggerBackgroundRegeneration } from '../../../lib/regenerate-blog-links';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const mapping = await InternalLinkMapping.findById(id);
      if (!mapping) {
        return res.status(404).json({ message: 'Link mapping not found' });
      }
      res.json(mapping);
    } catch (error) {
      console.error('Error fetching link mapping:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        keyword,
        url,
        priority,
        caseSensitive,
        maxOccurrences,
        isActive,
        description,
      } = req.body;

      // Validation
      if (keyword !== undefined && keyword.trim().length === 0) {
        return res.status(400).json({ message: 'Keyword cannot be empty' });
      }

      if (url !== undefined && url.trim().length === 0) {
        return res.status(400).json({ message: 'URL cannot be empty' });
      }

      // Check if keyword is being changed to one that already exists
      if (keyword) {
        const existingMapping = await InternalLinkMapping.findOne({
          keyword,
          _id: { $ne: id },
        });
        if (existingMapping) {
          return res.status(400).json({ message: 'A mapping with this keyword already exists' });
        }
      }

      const updateData: any = {
        updatedAt: new Date(),
      };

      if (keyword !== undefined) updateData.keyword = keyword.trim();
      if (url !== undefined) updateData.url = url.trim();
      if (priority !== undefined) updateData.priority = priority;
      if (caseSensitive !== undefined) updateData.caseSensitive = caseSensitive;
      if (maxOccurrences !== undefined) updateData.maxOccurrences = maxOccurrences;
      if (isActive !== undefined) updateData.isActive = isActive;
      if (description !== undefined) updateData.description = description;

      const mapping = await InternalLinkMapping.findByIdAndUpdate(id, updateData, { new: true });

      if (!mapping) {
        return res.status(404).json({ message: 'Link mapping not found' });
      }

      // Trigger background regeneration of all blogs
      triggerBackgroundRegeneration();

      res.json(mapping);
    } catch (error: any) {
      console.error('Error updating link mapping:', error);
      if (error.code === 11000) {
        return res.status(400).json({ message: 'A mapping with this keyword already exists' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const mapping = await InternalLinkMapping.findByIdAndDelete(id);
      if (!mapping) {
        return res.status(404).json({ message: 'Link mapping not found' });
      }

      // Trigger background regeneration of all blogs
      triggerBackgroundRegeneration();

      res.json({ message: 'Link mapping deleted successfully' });
    } catch (error) {
      console.error('Error deleting link mapping:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
