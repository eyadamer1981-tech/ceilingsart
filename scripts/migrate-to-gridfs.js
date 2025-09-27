// Migrate existing Services, Projects, Blogs images (base64/data URLs) to GridFS
// Usage: node scripts/migrate-to-gridfs.js [--limit N]

const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();
try { require('dotenv').config({ path: '.env.local' }); } catch {}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artceiling';

function parseDataUrl(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  const match = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!match) return null;
  const mimeType = match[1];
  const base64 = match[2];
  const buffer = Buffer.from(base64, 'base64');
  return { mimeType, buffer };
}

async function saveToGridFS(bucket, filename, mimeType, buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename || 'image', { contentType: mimeType });
    uploadStream.on('error', reject);
    uploadStream.on('finish', () => resolve(uploadStream.id));
    uploadStream.end(buffer);
  });
}

async function migrateCollection(Model, mainField, idField, detailField, detailIdsField, limit) {
  const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
  const query = {}; 
  const docs = await Model.find(query).limit(limit || 0);
  let migrated = 0;
  for (const doc of docs) {
    let changed = false;
    // Main image
    const parsed = parseDataUrl(doc[mainField]);
    if (parsed && !doc[idField]) {
      const gridId = await saveToGridFS(bucket, `${Model.modelName}-${doc._id}-main`, parsed.mimeType, parsed.buffer);
      doc[idField] = gridId;
      changed = true;
    }
    // Detail images array
    if (Array.isArray(doc[detailField])) {
      const newIds = Array.isArray(doc[detailIdsField]) ? doc[detailIdsField] : [];
      for (let i = 0; i < doc[detailField].length; i++) {
        const p = parseDataUrl(doc[detailField][i]);
        if (p) {
          const id = await saveToGridFS(bucket, `${Model.modelName}-${doc._id}-detail-${i}`, p.mimeType, p.buffer);
          newIds[i] = id;
          changed = true;
        }
      }
      doc[detailIdsField] = newIds;
    }
    if (changed) {
      await Model.updateOne({ _id: doc._id }, {
        $set: {
          [idField]: doc[idField],
          ...(detailIdsField ? { [detailIdsField]: doc[detailIdsField] } : {}),
        }
      });
      migrated += 1;
    }
  }
  return migrated;
}

(async () => {
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  // Ensure models are registered by importing app models
  // Register models by requiring TS directly (ts-node/register not used; schemas define on import)
  try { require('../src/lib/models.ts'); } catch { try { require('../src/lib/models'); } catch {} }
  const Service = mongoose.model('Service');
  const Project = mongoose.model('Project');
  const Blog = mongoose.model('Blog');

  const limitArg = process.argv.includes('--limit') ? parseInt(process.argv[process.argv.indexOf('--limit') + 1], 10) : undefined;

  const svc = await migrateCollection(Service, 'image', 'imageId', 'detailImages', 'detailImageIds', limitArg);
  const prj = await migrateCollection(Project, 'image', 'imageId', 'detailImages', 'detailImageIds', limitArg);
  const blg = await migrateCollection(Blog, 'image', 'imageId', undefined, undefined, limitArg);

  console.log(JSON.stringify({ migratedServices: svc, migratedProjects: prj, migratedBlogs: blg }, null, 2));
  await mongoose.disconnect();
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });


