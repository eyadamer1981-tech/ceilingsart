import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Service } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const categories: string[] = await Service.distinct('category');
    res.json(categories.filter(Boolean).sort());
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}







