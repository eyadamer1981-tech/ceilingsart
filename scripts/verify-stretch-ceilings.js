const mongoose = require('mongoose');

// Connect to MongoDB Atlas cloud database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://eslamabdullatif21_db_user:oneone2@cluster0.93xn6yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Define StretchCeiling schema
const stretchCeilingSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, default: 'Stretch Ceilings' },
  subcategory: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  features: { type: [String], default: [] },
  specifications: { type: Object, default: {} },
  warranty: { type: String, default: '10-Year Warranty' },
  materials: { type: String, default: 'European Materials' },
  installation: { type: String, default: 'Certified Installation Team' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const StretchCeiling = mongoose.models.StretchCeiling || mongoose.model('StretchCeiling', stretchCeilingSchema);

async function verifyStretchCeilings() {
  try {
    await connectDB();
    
    console.log('Fetching all stretch ceilings from database...');
    const stretchCeilings = await StretchCeiling.find({}).sort({ createdAt: 1 });
    
    console.log(`\nFound ${stretchCeilings.length} stretch ceiling types in database:\n`);
    
    stretchCeilings.forEach((ceiling, index) => {
      console.log(`${index + 1}. ${ceiling.titleEn}`);
      console.log(`   Arabic: ${ceiling.titleAr}`);
      console.log(`   Subcategory: ${ceiling.subcategory}`);
      console.log(`   Featured: ${ceiling.featured ? 'Yes' : 'No'}`);
      console.log(`   Main Image: ${ceiling.image}`);
      console.log(`   Detail Images: ${ceiling.detailImages.length} images`);
      console.log(`   Features: ${ceiling.features.length} features`);
      console.log(`   Warranty: ${ceiling.warranty}`);
      console.log(`   Materials: ${ceiling.materials}`);
      console.log(`   Installation: ${ceiling.installation}`);
      console.log(`   Created: ${ceiling.createdAt.toISOString()}`);
      console.log('');
    });
    
    // Show featured ceilings
    const featuredCeilings = stretchCeilings.filter(ceiling => ceiling.featured);
    console.log(`Featured Ceilings (${featuredCeilings.length}):`);
    featuredCeilings.forEach((ceiling, index) => {
      console.log(`${index + 1}. ${ceiling.titleEn} (${ceiling.subcategory})`);
    });
    
    console.log('\nVerification completed successfully!');
    
  } catch (error) {
    console.error('Verification error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the verification
verifyStretchCeilings();
