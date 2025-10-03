import type { NextApiRequest, NextApiResponse } from 'next';
import { getGridFSBucket } from '../../../lib/gridfs';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ message: 'Missing id' });
    const _id = new ObjectId(id);

    const bucket = await getGridFSBucket();
    const files = await bucket.find({ _id }).toArray();
    if (!files || files.length === 0) return res.status(404).json({ message: 'Not found' });
    const file = files[0] as any;

    // Set content type and stream
    if (file.contentType) res.setHeader('Content-Type', file.contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const downloadStream = bucket.openDownloadStream(_id);
    downloadStream.on('error', () => res.status(500).end());
    downloadStream.pipe(res);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
}







