const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/art-website';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Stretch Ceiling Schema
const stretchCeilingSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, default: 'Stretch Ceilings' },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const StretchCeiling = mongoose.models.StretchCeiling || mongoose.model('StretchCeiling', stretchCeilingSchema);

async function fixStretchCeilingImages() {
  try {
    await connectDB();
    
    console.log('Fixing stretch ceiling image paths...');
    
    // Fix Fiber Optic ceiling image
    const fiberOpticUpdate = await StretchCeiling.findOneAndUpdate(
      { titleEn: 'Fiber Optic Ceilings (Rose)' },
      { 
        image: '/art-images/stretch-ceiling/fiber-optic/star-ceiling2.jpg',
        detailImages: [
          '/art-images/stretch-ceiling/fiber-optic/star-ceiling3.jpg',
          '/art-images/stretch-ceiling/fiber-optic/star-ceiling5.jpg',
          '/art-images/stretch-ceiling/fiber-optic/star-ceiling7.jpg'
        ]
      },
      { new: true }
    );
    
    if (fiberOpticUpdate) {
      console.log('✅ Fixed Fiber Optic ceiling image');
    } else {
      console.log('❌ Fiber Optic ceiling not found');
    }
    
    // Fix Matte ceiling image - use the existing file
    const matteUpdate = await StretchCeiling.findOneAndUpdate(
      { titleEn: 'Matte Stretch Ceiling Designs' },
      { 
        image: '/art-images/stretch-ceiling/matte/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp',
        detailImages: [
          '/art-images/stretch-ceiling/matte/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp',
          '/art-images/stretch-ceiling/matte/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp',
          '/art-images/stretch-ceiling/matte/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp'
        ]
      },
      { new: true }
    );
    
    if (matteUpdate) {
      console.log('✅ Fixed Matte ceiling image');
    } else {
      console.log('❌ Matte ceiling not found');
    }
    
    // Let's also check if there are any other issues with image paths
    const allCeilings = await StretchCeiling.find({});
    console.log('\nChecking all stretch ceiling images...');
    
    for (const ceiling of allCeilings) {
      console.log(`${ceiling.titleEn}: ${ceiling.image}`);
    }
    
    console.log('\n✅ Image fixes completed successfully!');
    
  } catch (error) {
    console.error('Error fixing images:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixStretchCeilingImages();
