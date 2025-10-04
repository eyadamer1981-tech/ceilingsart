const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/art');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.model('Service', serviceSchema);

async function clearAllServices() {
  try {
    await connectDB();
    
    console.log('🗑️  Clearing ALL services from database...');
    
    // Count services before deletion
    const countBefore = await Service.countDocuments();
    console.log(`📊 Found ${countBefore} services to delete`);
    
    if (countBefore === 0) {
      console.log('✅ Database is already empty - no services to delete');
      return;
    }
    
    // Delete all services
    const deleteResult = await Service.deleteMany({});
    
    console.log(`✅ Successfully deleted ${deleteResult.deletedCount} services`);
    console.log('🧹 Database cleared - ready for new content');
    
  } catch (error) {
    console.error('❌ Error clearing services:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
clearAllServices();

