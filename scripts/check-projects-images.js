const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/art-website';
  await mongoose.connect(uri).catch((e) => {
    console.error('Mongo connect error:', e);
    process.exit(1);
  });

  const Project = mongoose.connection.collection('projects');

  const total = await Project.countDocuments({});
  const gridfsUrlCount = await Project.countDocuments({ image: { $regex: '^/api/images/[a-f0-9]{24}$' } });
  const imageIdCount = await Project.countDocuments({ imageId: { $exists: true, $ne: null } });
  const detailImageIdsAny = await Project.countDocuments({ detailImageIds: { $exists: true, $type: 'array', $ne: [] } });
  const dataUrlCount = await Project.countDocuments({ image: { $regex: '^data:' } });
  const httpUrlCount = await Project.countDocuments({ image: { $regex: '^(https?://)' } });
  const rootSlashUrlCount = await Project.countDocuments({ image: { $regex: '^/' } });
  const nullOrMissing = await Project.countDocuments({ $or: [ { image: { $exists: false } }, { image: null }, { image: '' } ] });

  // Only log counts to keep output concise
  console.log(JSON.stringify({
    uri,
    total,
    gridfsUrlCount,
    imageIdCount,
    detailImageIdsAny,
    dataUrlCount,
    httpUrlCount,
    rootSlashUrlCount,
    nullOrMissing
  }, null, 2));

  await mongoose.disconnect();
}

if (require.main === module) {
  main().catch(async (e) => {
    console.error(e);
    try { await mongoose.disconnect(); } catch {}
    process.exit(1);
  });
}


