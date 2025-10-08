const mongoose = require('mongoose');

// Connect to MongoDB
// NOTE: We use the TEST database. Set MONGODB_URI to mongodb://localhost:27017/test when running.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/art-website');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

async function checkCollections() {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('Available collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Check each collection for services
    for (const collection of collections) {
      if (collection.name.includes('service') || collection.name.includes('Service')) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`\nCollection ${collection.name} has ${count} documents`);
        
        if (count > 0) {
          const sample = await db.collection(collection.name).findOne();
          console.log(`Sample document:`, JSON.stringify(sample, null, 2));
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkCollections();
