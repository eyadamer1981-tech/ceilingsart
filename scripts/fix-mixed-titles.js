const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artceiling');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Define Project schema
const projectSchema = new mongoose.Schema({
  title: String,
  titleEn: String,
  titleAr: String,
  descriptionEn: String,
  descriptionAr: String,
  image: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

// Clean Arabic translations for the specific titles
const cleanArabicTranslations = {
  'Modern Stretch Ceiling Design': 'تصميم سقف مشدود عصري',
  'High Gloss Ceiling Installation In The Bathroom': 'تركيب سقف لامع في الحمام',
  'High Gloss Ceiling Installation On The Kitchen': 'تركيب سقف لامع في المطبخ',
  'Luxury Condo Family Room With Multilevel Red Stretch Ceiling Deutchland': 'غرفة عائلية فاخرة بسقف مشدود أحمر متعدد المستويات',
  'Multilevel Waved Reflective White Glossy Stretch Ceiling In Monopoly': 'سقف مشدود أبيض لامع متعدد المستويات مع موجات عاكسة',
  'Pool Spa1': 'سقف مشدود للمسبح والسبا 1',
  'Pool Spa3': 'سقف مشدود للمسبح والسبا 3',
  'Pool Spa6': 'سقف مشدود للمسبح والسبا 6',
  'Merchandise Mart': 'مركز التجارة',
  'Modern Stretch Ceiling Installation': 'تركيب سقف مشدود عصري',
  'Contemporary Ceiling Design': 'تصميم سقف معاصر',
  'Premium Stretch Ceiling': 'سقف مشدود مميز',
  'Elegant Ceiling Solution': 'حل سقف أنيق',
  'Professional Ceiling Installation': 'تركيب سقف احترافي',
  'Modern Ceiling Installation': 'تركيب سقف عصري'
};

// Function to clean title (remove month names and extra text)
function cleanTitle(title) {
  if (!title) return title;
  
  // Remove month patterns
  let cleaned = title.replace(/\s*-\s*(January|February|March|April|May|June|July|August|September|October|November|December)\s*$/i, '').trim();
  
  // Remove any Arabic text that might be mixed in
  cleaned = cleaned.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '').trim();
  
  // Clean up extra spaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

async function fixMixedTitles() {
  try {
    await connectDB();
    console.log('🔍 Fixing mixed Arabic/English titles...\n');
    
    const projects = await Project.find({});
    console.log(`📊 Found ${projects.length} total projects\n`);
    
    let updatedCount = 0;
    
    for (const project of projects) {
      console.log(`\n🔍 Processing: "${project.titleEn || project.title}"`);
      
      // Clean the English title
      const cleanEnglishTitle = cleanTitle(project.titleEn || project.title);
      
      // Get proper Arabic translation
      const properArabicTitle = cleanArabicTranslations[cleanEnglishTitle] || 'سقف مشدود';
      
      console.log(`   Cleaned English: "${cleanEnglishTitle}"`);
      console.log(`   Proper Arabic: "${properArabicTitle}"`);
      
      // Update the project with clean titles
      await Project.updateOne(
        { _id: project._id },
        { 
          $set: { 
            titleEn: cleanEnglishTitle,
            titleAr: properArabicTitle,
            title: cleanEnglishTitle
          } 
        }
      );
      
      console.log(`   ✅ Updated successfully`);
      updatedCount++;
    }
    
    console.log(`\n🎉 Mixed titles fix completed!`);
    console.log(`✅ Updated: ${updatedCount} projects`);
    
  } catch (error) {
    console.error('❌ Error fixing mixed titles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

fixMixedTitles();
