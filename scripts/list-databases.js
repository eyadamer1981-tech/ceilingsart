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

async function listDatabases() {
  try {
    await connectDB();
    
    const admin = mongoose.connection.db.admin();
    const result = await admin.listDatabases();
    
    console.log('Available databases:');
    result.databases.forEach(db => {
      console.log(`- ${db.name} (${db.sizeOnDisk} bytes)`);
    });
    
    // Check each database for services collection
    for (const dbInfo of result.databases) {
      if (dbInfo.name !== 'admin' && dbInfo.name !== 'local') {
        console.log(`\nChecking database: ${dbInfo.name}`);
        const db = mongoose.connection.useDb(dbInfo.name);
        const collections = await db.listCollections().toArray();
        
        const serviceCollections = collections.filter(c => 
          c.name.toLowerCase().includes('service')
        );
        
        if (serviceCollections.length > 0) {
          console.log(`Found service collections in ${dbInfo.name}:`);
          for (const collection of serviceCollections) {
            const count = await db.collection(collection.name).countDocuments();
            console.log(`  - ${collection.name}: ${count} documents`);
            
            if (count > 0) {
              const sample = await db.collection(collection.name).findOne();
              console.log(`    Sample category: ${sample?.category || 'No category'}`);
            }
          }
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

listDatabases();
