import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Gallery API removed; categories now from projects
  return res.status(410).json({ message: 'Use /api/projects/categories' });
}


