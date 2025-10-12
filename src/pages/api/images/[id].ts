import type { NextApiRequest, NextApiResponse } from 'next';
import { getGridFSBucket } from '../../../lib/gridfs';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ message: 'Missing id' });
    
    // Validate ObjectId format before creating ObjectId instance
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id format' });
    
    const _id = new ObjectId(id);
    const bucket = await getGridFSBucket();

    // Use findOne instead of find().toArray() for better performance
    const file = await bucket.find({ _id }).limit(1).next();
    if (!file) return res.status(404).json({ message: 'Not found' });

    // Set optimized headers
    if (file.contentType) res.setHeader('Content-Type', file.contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('ETag', `"${id}"`);
    
    // Handle conditional requests (If-None-Match)
    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch === `"${id}"`) {
      return res.status(304).end();
    }

    // Stream the file with better error handling
    const downloadStream = bucket.openDownloadStream(_id);
    
    downloadStream.on('error', (error) => {
      console.error('GridFS download error:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error streaming file' });
      }
    });

    downloadStream.on('end', () => {
      if (!res.headersSent) {
        res.end();
      }
    });

    downloadStream.pipe(res);
  } catch (e) {
    console.error('Images API error:', e);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}









