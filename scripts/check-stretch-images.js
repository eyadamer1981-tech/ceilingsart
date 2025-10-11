const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/art-website';
  await mongoose.connect(uri).catch((e) => {
    console.error('Mongo connect error:', e);
    process.exit(1);
  });

  const Coll = mongoose.connection.collection('stretchceilings');

  const total = await Coll.countDocuments({});
  const gridfsUrlCount = await Coll.countDocuments({ image: { $regex: '^/api/images/[a-f0-9]{24}$' } });
  const imageIdCount = await Coll.countDocuments({ imageId: { $exists: true, $ne: null } });
  const detailImageIdsAny = await Coll.countDocuments({ detailImageIds: { $exists: true, $type: 'array', $ne: [] } });
  const dataUrlCount = await Coll.countDocuments({ image: { $regex: '^data:' } });
  const httpUrlCount = await Coll.countDocuments({ image: { $regex: '^(https?://)' } });
  const rootSlashUrlCount = await Coll.countDocuments({ image: { $regex: '^/' } });
  const nullOrMissing = await Coll.countDocuments({ $or: [ { image: { $exists: false } }, { image: null }, { image: '' } ] });

  console.log(JSON.stringify({
    uri,
    collection: 'stretchceilings',
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






