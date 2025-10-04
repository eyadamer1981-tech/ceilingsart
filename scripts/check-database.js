const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/art-website');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Service Schema
const serviceSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  detailImages: [{ type: String }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

// Check what's in the database
const checkDatabase = async () => {
  try {
    console.log('Checking database contents...');
    
    const allServices = await Service.find();
    console.log(`Total services in database: ${allServices.length}`);
    
    allServices.forEach(service => {
      console.log(`- ${service.titleEn} (Category: ${service.category}, Featured: ${service.featured})`);
    });
    
    const acousticServices = await Service.find({ category: 'Acoustic Panels' });
    console.log(`\nAcoustic panel services: ${acousticServices.length}`);
    
    acousticServices.forEach(service => {
      console.log(`- ${service.titleEn} (Featured: ${service.featured})`);
    });
    
  } catch (error) {
    console.error('Error checking database:', error);
  }
};

// Run check
const runCheck = async () => {
  await connectDB();
  await checkDatabase();
  await mongoose.connection.close();
  console.log('Check completed and connection closed');
};

// Run if called directly
if (require.main === module) {
  runCheck();
}

module.exports = { checkDatabase };
