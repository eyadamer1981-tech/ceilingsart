import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import { Service } from '../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    
    const services = await Service.find({}).limit(5);
    
    res.status(200).json({
      success: true,
      message: 'Database connected successfully',
      count: services.length,
      services: services
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
