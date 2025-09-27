import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

function verifyToken(req: NextApiRequest, res: NextApiResponse): boolean {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return false;
  }
  try {
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    return true;
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
    return false;
  }
}

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function fileToDataUrl(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.png'
    ? 'image/png'
    : ext === '.webp'
    ? 'image/webp'
    : ext === '.avif'
    ? 'image/avif'
    : 'image/jpeg';
  const base64 = buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

function titleFromFilename(filename: string) {
  const name = filename.replace(path.extname(filename), '');
  return name
    .replace(/[_.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function categoryFromDirs(dirs: string[]): string {
  const lowered = dirs.map((d) => d.toLowerCase());
  for (const d of lowered) {
    if (d.includes('stretch')) return 'Stretch Ceiling';
    if (d.includes('acoustic')) return 'Acoustic';
    if (d.includes('wood wool')) return 'Wood Wool';
    if (d.includes('fiber optic')) return 'Fiber Optic';
    if (d.includes('mirror')) return 'Mirror Stretch Ceiling';
    if (d.includes('glossy')) return 'Glossy Stretch Ceiling';
    if (d.includes('printed')) return 'Printed Stretch Ceiling';
    if (d.includes('translucent')) return 'Translucent Stretch Ceiling';
  }
  const last = dirs[dirs.length - 1] || 'General';
  return last
    .replace(/[_.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(410).json({ message: 'Gallery import disabled. Manage content via Projects.' });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};


