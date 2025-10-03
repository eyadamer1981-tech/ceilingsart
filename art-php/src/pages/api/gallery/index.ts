import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Gallery endpoints removed in favor of Projects. Keep this stub to avoid 404s.
  return res.status(410).json({ message: 'Gallery API removed. Use /api/projects or /api/projects/light.' });
}
