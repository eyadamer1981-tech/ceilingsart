// Import images from art_images into Projects with GridFS storage
// Usage: node scripts/import-projects-gridfs.js [--root path/to/art_images] [--dry]

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();
try { require('dotenv').config({ path: '.env.local' }); } catch {}

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function categoryFromDirs(dirs) {
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
  return last.replace(/[_.-]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

function titleFromFilename(filename) {
  const name = filename.replace(path.extname(filename), '');
  return name.replace(/[_.-]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

async function saveFileToGridFS(bucket, filePath, filename) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : ext === '.avif' ? 'image/avif' : 'image/jpeg';
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, { contentType: mime });
    uploadStream.on('error', reject);
    uploadStream.on('finish', () => resolve(uploadStream.id));
    uploadStream.end(buffer);
  });
}

(async () => {
  const rootIdx = process.argv.indexOf('--root');
  const customRoot = rootIdx !== -1 ? process.argv[rootIdx + 1] : undefined;
  const dryRun = process.argv.includes('--dry');

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artceiling';
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  try { require('../src/lib/models.ts'); } catch { try { require('../src/lib/models'); } catch {} }
  const Project = mongoose.model('Project');
  const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });

  const workspaceRoot = process.cwd();
  const artImagesRoot = customRoot ? path.resolve(customRoot) : path.resolve(workspaceRoot, 'art_images');
  if (!fs.existsSync(artImagesRoot)) {
    console.error(`art_images not found at ${artImagesRoot}`);
    process.exit(1);
  }

  const discovered = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (!SUPPORTED_EXTENSIONS.has(ext)) continue;
        const relative = path.relative(artImagesRoot, fullPath);
        const parts = relative.split(path.sep);
        const filename = parts[parts.length - 1];
        const dirParts = parts.slice(0, parts.length - 1);
        discovered.push({ relative, fullPath: fullPath, title: titleFromFilename(filename), category: categoryFromDirs(dirParts) });
      }
    }
  }
  walk(artImagesRoot);

  let created = 0;
  for (const item of discovered) {
    if (dryRun) continue;
    const imageId = await saveFileToGridFS(bucket, item.fullPath, `${item.title}`);
    const doc = new Project({
      title: item.title,
      descriptionEn: `${item.title} in ${item.category}`,
      descriptionAr: `${item.title} - ${item.category}`,
      image: `/api/images/${imageId}`,
      imageId,
      detailImages: [],
      detailImageIds: [],
      category: item.category,
      featured: false,
    });
    await doc.save();
    created += 1;
  }

  console.log(JSON.stringify({ root: artImagesRoot, discovered: discovered.length, created, dryRun }, null, 2));
  await mongoose.disconnect();
  process.exit(0);
})();


