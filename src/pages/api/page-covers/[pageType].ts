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

  res.status(405).json({ message: 'Method not allowed' });
}
