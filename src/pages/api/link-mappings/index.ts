import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { InternalLinkMapping } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Get all link mappings, sorted by priority (descending)
      const mappings = await InternalLinkMapping.find().sort({ priority: -1, createdAt: -1 });
      res.json(mappings);
    } catch (error) {
      console.error('Error fetching link mappings:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        keyword,
        url,
        priority = 0,
        caseSensitive = false,
        maxOccurrences = 1,
        isActive = true,
        description = '',
      } = req.body;

      // Validation
      if (!keyword || keyword.trim().length === 0) {
        return res.status(400).json({ message: 'Keyword is required' });
      }

      if (!url || url.trim().length === 0) {
        return res.status(400).json({ message: 'URL is required' });
      }

      // Check if keyword already exists
      const existingMapping = await InternalLinkMapping.findOne({ keyword });
      if (existingMapping) {
        return res.status(400).json({ message: 'A mapping with this keyword already exists' });
      }

      const mapping = new InternalLinkMapping({
        keyword: keyword.trim(),
        url: url.trim(),
        priority,
        caseSensitive,
        maxOccurrences,
        isActive,
        description,
      });

      await mapping.save();
      res.status(201).json(mapping);
    } catch (error: any) {
      console.error('Error creating link mapping:', error);
      if (error.code === 11000) {
        return res.status(400).json({ message: 'A mapping with this keyword already exists' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
