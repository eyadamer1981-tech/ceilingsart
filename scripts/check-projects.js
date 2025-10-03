const mongoose = require('mongoose');

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artceiling';
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false, collection: 'projects' }));
  const count = await Project.countDocuments();
  const sample = await Project.find({}, { title: 1, category: 1 }).limit(5).lean();
  console.log(JSON.stringify({ uri: MONGODB_URI, count, sample }, null, 2));
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });









