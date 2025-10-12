import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.json({ 
        status: 'no_token',
        message: 'No token provided',
        jwtSecret: process.env.JWT_SECRET ? 'Secret present' : 'No secret'
      });
    }

    const jwt = require('jsonwebtoken');
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
      return res.json({ 
        status: 'valid',
        message: 'Token is valid',
        decoded: decoded,
        jwtSecret: process.env.JWT_SECRET ? 'Secret present' : 'No secret'
      });
    } catch (jwtError) {
      return res.json({ 
        status: 'invalid',
        message: 'Token is invalid',
        error: jwtError.message,
        jwtSecret: process.env.JWT_SECRET ? 'Secret present' : 'No secret'
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      status: 'error',
      message: 'Server error',
      error: (error as any).message
    });
  }
}









