const mongoose = require('mongoose');

// Connect to MongoDB artceiling database
// NOTE: Use the TEST database for development. Prefer setting MONGODB_URI to mongodb://localhost:27017/test.
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/artceiling');
    console.log('Connected to MongoDB artceiling database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

async function checkArtceilingDatabase() {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('Available collections in artceiling database:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Check services collection
    const servicesCollection = collections.find(c => c.name === 'services');
    if (servicesCollection) {
      const count = await db.collection('services').countDocuments();
      console.log(`\nServices collection has ${count} documents`);
      
      if (count > 0) {
        const sample = await db.collection('services').findOne();
        console.log(`Sample document:`, JSON.stringify(sample, null, 2));
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkArtceilingDatabase();
