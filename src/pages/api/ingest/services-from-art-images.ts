import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import connectDB from '../../../lib/mongodb';
import { AcousticPanel, StretchCeiling, Project } from '../../../lib/models';

// Simple JWT guard (reuse logic inline to avoid importing middleware)
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

// Decide category based on folder names under art_images/New folder
function categoryFromDirs(dirs: string[]): string {
  // Try to pick a meaningful parent folder as category
  // Prefer top-level like "stretch ceiling" / "acoustic panels"
  const lowered = dirs.map((d) => d.toLowerCase());
  for (const d of lowered) {
    if (d.includes('stretch')) return 'Stretch Ceiling';
    if (d.includes('acoustic')) return 'Acoustic Panels';
    if (d.includes('wood wool')) return 'Wood Wool';
    if (d.includes('fiber optic')) return 'Fiber Optic Ceiling';
    if (d.includes('mirror')) return 'Mirror Stretch Ceiling';
    if (d.includes('glossy')) return 'Glossy Stretch Ceiling';
    if (d.includes('printed')) return 'Printed Stretch Ceiling';
    if (d.includes('translucent')) return 'Translucent Stretch Ceiling';
  }
  // Fallback to the last directory name formatted
  const last = dirs[dirs.length - 1] || 'General';
  return last
    .replace(/[_.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (process.env.NODE_ENV === 'production') {
    if (!verifyToken(req, res)) return;
  }

  await connectDB();

  try {
    const workspaceRoot = process.cwd();
    // Default to d:\\art\\art_images relative to project root. If running elsewhere, allow body.root.
    const { root: customRoot, dryRun } = (req.body || {}) as { root?: string; dryRun?: boolean };
    const artImagesRoot = customRoot
      ? path.resolve(customRoot)
      : path.resolve(workspaceRoot, 'art_images');

    if (!fs.existsSync(artImagesRoot)) {
      return res.status(404).json({ message: `art_images not found at ${artImagesRoot}` });
    }

    const created: any[] = [];
    const skipped: any[] = [];

    const walk = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (!SUPPORTED_EXTENSIONS.has(ext)) continue;

          const relative = path.relative(artImagesRoot, fullPath);
          const parts = relative.split(path.sep);
          const filename = parts[parts.length - 1];
          const dirParts = parts.slice(0, parts.length - 1);

          const title = titleFromFilename(filename);
          const category = categoryFromDirs(dirParts);

          // Avoid duplicates by title
          // Note: this is heuristic; consider adding a unique sourcePath in schema for reliability
          // @ts-ignore
          created.push({ title, category, path: relative });
        }
      }
    };

    walk(artImagesRoot);

    let actuallyCreated = 0;
    if (!dryRun) {
      for (const item of created) {
        // Determine which model to use based on category
        let Model, existing;
        
        if (item.category.toLowerCase().includes('acoustic')) {
          Model = AcousticPanel;
          existing = await Model.findOne({ titleEn: item.title });
        } else if (item.category.toLowerCase().includes('stretch') || item.category.toLowerCase().includes('ceiling')) {
          Model = StretchCeiling;
          existing = await Model.findOne({ titleEn: item.title });
        } else {
          // For other categories, use Project
          Model = Project;
          existing = await Model.findOne({ titleEn: item.title });
        }
        
        if (existing) {
          skipped.push({ title: item.title, reason: 'exists' });
          continue;
        }
        
        const abs = path.join(artImagesRoot, item.path);
        const dataUrl = fileToDataUrl(abs);
        
        const doc = new Model({
          titleEn: item.title,
          titleAr: item.title,
          descriptionEn: item.title,
          descriptionAr: item.title,
          category: item.category,
          image: dataUrl,
          detailImages: [],
          featured: false,
        });
        
        await doc.save();
        actuallyCreated += 1;
        
        // Also add to projects collection for "Our Work" section
        if (Model !== Project) {
          const projectDoc = new Project({
            titleEn: item.title,
            titleAr: item.title,
            descriptionEn: item.title,
            descriptionAr: item.title,
            category: item.category,
            image: dataUrl,
            detailImages: [],
            featured: false,
          });
          await projectDoc.save();
        }
      }
    }

    res.json({
      root: artImagesRoot,
      discovered: created.length,
      created: dryRun ? 0 : actuallyCreated,
      skipped: skipped.length,
      dryRun: !!dryRun,
      sample: created.slice(0, 10),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};


