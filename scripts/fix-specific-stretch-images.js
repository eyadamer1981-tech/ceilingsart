const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
// NOTE: We use the TEST database. Set MONGODB_URI to mongodb://localhost:27017/test when running.
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

async function fixSpecificStretchCeilingImages() {
  try {
    await connectDB();
    
    console.log('Fixing specific stretch ceiling image paths...');
    
    // Fix Light Transmitting Stretch Ceilings
    const translucentUpdate = await StretchCeiling.findOneAndUpdate(
      { titleEn: 'Light Transmitting Stretch Ceilings' },
      { 
        image: '/art-images/stretch-ceiling/translucent/NEWMAT-ceiling-mounted-lightbox-scaled.jpg',
        detailImages: [
          '/art-images/stretch-ceiling/translucent/lightboxes-03.jpg',
          '/art-images/stretch-ceiling/translucent/lightboxes-05.jpg',
          '/art-images/stretch-ceiling/translucent/lightboxes-08.jpg'
        ]
      },
      { new: true }
    );
    
    if (translucentUpdate) {
      console.log('✅ Fixed Light Transmitting Stretch Ceilings image');
      console.log('   New image:', translucentUpdate.image);
    } else {
      console.log('❌ Light Transmitting Stretch Ceilings not found');
    }
    
    // Fix Perforated and Acoustic Stretch Ceilings
    const acousticUpdate = await StretchCeiling.findOneAndUpdate(
      { titleEn: 'Perforated and Acoustic Stretch Ceilings' },
      { 
        image: '/art-images/stretch-ceiling/acoustic/NEWMAT-suspended-panels-museum-scaled.jpg',
        detailImages: [
          '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-002.jpg',
          '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-050.jpg',
          '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-085.jpg'
        ]
      },
      { new: true }
    );
    
    if (acousticUpdate) {
      console.log('✅ Fixed Perforated and Acoustic Stretch Ceilings image');
      console.log('   New image:', acousticUpdate.image);
    } else {
      console.log('❌ Perforated and Acoustic Stretch Ceilings not found');
    }
    
    console.log('\n✅ Specific image fixes completed successfully!');
    
  } catch (error) {
    console.error('Error fixing images:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixSpecificStretchCeilingImages();
