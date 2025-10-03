import type { NextApiRequest, NextApiResponse } from 'next';
import { getGridFSBucket } from '../../lib/gridfs';
import multer from 'multer';
import { Readable } from 'stream';

// Disable Next.js default body parser to allow multer to handle multipart data
export const config = { api: { bodyParser: false } };

const upload = multer({ storage: multer.memoryStorage() });

function runMulter(req: NextApiRequest, res: NextApiResponse): Promise<{ file?: multer.File }>
{
  return new Promise((resolve, reject) => {
    upload.single('image')(req as any, res as any, (err: any) => {
      if (err) return reject(err);
      resolve({ file: (req as any).file });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { file } = await runMulter(req, res);
    if (!file) return res.status(400).json({ message: 'No file uploaded. Field name should be "image".' });

    const bucket = await getGridFSBucket();
    const metadata = { originalName: file.originalname, mimeType: file.mimetype, size: file.size };
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
      metadata,
    });

    Readable.from(file.buffer).pipe(uploadStream)
      .on('error', () => res.status(500).json({ message: 'Upload failed' }))
      .on('finish', () => res.status(201).json({ id: uploadStream.id, filename: uploadStream.filename }));
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
}






