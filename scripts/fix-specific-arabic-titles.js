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

// Comprehensive Arabic translations for specific titles
const specificArabicTranslations = {
  // High gloss installations
  'High Gloss Ceiling Installation In The Bathroom': 'تركيب سقف لامع في الحمام',
  'High Gloss Ceiling Installation On The Kitchen': 'تركيب سقف لامع في المطبخ',
  'Luxury Condo Family Room With Multilevel Red Stretch Ceiling Deutchland': 'غرفة عائلية فاخرة بسقف مشدود أحمر متعدد المستويات',
  'Multilevel Waved Reflective White Glossy Stretch Ceiling In Monopoly': 'سقف مشدود أبيض لامع متعدد المستويات مع موجات عاكسة',
  
  // Pool and spa
  'Pool Spa1': 'سقف مشدود للمسبح والسبا 1',
  'Pool Spa3': 'سقف مشدود للمسبح والسبا 3',
  'Pool Spa6': 'سقف مشدود للمسبح والسبا 6',
  
  // Merchandise
  'Merchandise Mart': 'مركز التجارة',
  
  // Month-based installations
  'Modern Stretch Ceiling Installation - April': 'تركيب سقف مشدود عصري - أبريل',
  'Contemporary Ceiling Design - October': 'تصميم سقف معاصر - أكتوبر',
  'Premium Stretch Ceiling - October': 'سقف مشدود مميز - أكتوبر',
  'Elegant Ceiling Solution - October': 'حل سقف أنيق - أكتوبر',
  'Professional Ceiling Installation - July': 'تركيب سقف احترافي - يوليو',
  'Modern Ceiling Installation - May': 'تركيب سقف عصري - مايو',
  
  // Basic titles
  'Modern Stretch Ceiling Design': 'تصميم سقف مشدود عصري',
};

// Function to generate Arabic title based on English title
function generateArabicTitle(englishTitle) {
  // Check if we have a specific translation
  if (specificArabicTranslations[englishTitle]) {
    return specificArabicTranslations[englishTitle];
  }
  
  // Generate based on keywords
  const lowerTitle = englishTitle.toLowerCase();
  
  if (lowerTitle.includes('stretch ceiling')) {
    if (lowerTitle.includes('modern')) {
      return 'سقف مشدود عصري';
    } else if (lowerTitle.includes('glossy') || lowerTitle.includes('gloss')) {
      return 'سقف مشدود لامع';
    } else if (lowerTitle.includes('printed')) {
      return 'سقف مشدود مطبوع';
    } else if (lowerTitle.includes('mirror')) {
      return 'سقف مشدود مرآة';
    } else if (lowerTitle.includes('luxury')) {
      return 'سقف مشدود فاخر';
    } else if (lowerTitle.includes('multilevel')) {
      return 'سقف مشدود متعدد المستويات';
    } else {
      return 'سقف مشدود';
    }
  } else if (lowerTitle.includes('ceiling installation')) {
    if (lowerTitle.includes('bathroom')) {
      return 'تركيب سقف في الحمام';
    } else if (lowerTitle.includes('kitchen')) {
      return 'تركيب سقف في المطبخ';
    } else if (lowerTitle.includes('professional')) {
      return 'تركيب سقف احترافي';
    } else if (lowerTitle.includes('modern')) {
      return 'تركيب سقف عصري';
    } else {
      return 'تركيب سقف احترافي';
    }
  } else if (lowerTitle.includes('ceiling design')) {
    if (lowerTitle.includes('contemporary')) {
      return 'تصميم سقف معاصر';
    } else if (lowerTitle.includes('modern')) {
      return 'تصميم سقف عصري';
    } else {
      return 'تصميم سقف معاصر';
    }
  } else if (lowerTitle.includes('ceiling solution')) {
    if (lowerTitle.includes('elegant')) {
      return 'حل سقف أنيق';
    } else if (lowerTitle.includes('modern')) {
      return 'حل سقف عصري';
    } else {
      return 'حل سقف احترافي';
    }
  } else if (lowerTitle.includes('pool') && lowerTitle.includes('spa')) {
    return 'سقف مشدود للمسبح والسبا';
  } else if (lowerTitle.includes('merchandise')) {
    return 'مركز التجارة';
  } else if (lowerTitle.includes('luxury') && lowerTitle.includes('family room')) {
    return 'غرفة عائلية فاخرة';
  } else if (lowerTitle.includes('multilevel') && lowerTitle.includes('waved')) {
    return 'سقف مشدود متعدد المستويات مع موجات';
  } else {
    // Generic fallback
    return `مشروع ${englishTitle}`;
  }
}

async function fixSpecificArabicTitles() {
  try {
    await connectDB();
    console.log('🔍 Starting specific Arabic title fixes...\n');
    
    const projects = await Project.find({});
    console.log(`📊 Found ${projects.length} total projects\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const project of projects) {
      console.log(`\n🔍 Processing: "${project.title}"`);
      console.log(`   Current titleEn: "${project.titleEn}"`);
      console.log(`   Current titleAr: "${project.titleAr}"`);
      
      // Check if Arabic title needs fixing
      const isSame = project.titleAr === project.titleEn;
      const isGeneric = project.titleAr === 'أسقف مشدودة' || project.titleAr === 'Stretch Ceiling';
      const isEmpty = !project.titleAr || project.titleAr.trim() === '';
      
      if (isSame || isGeneric || isEmpty) {
        console.log(`   ✅ Found issue (same/generic/empty), fixing...`);
        
        // Generate proper Arabic title
        const properArabicTitle = generateArabicTitle(project.titleEn || project.title);
        
        console.log(`   📝 New titleAr: "${properArabicTitle}"`);
        
        await Project.updateOne(
          { _id: project._id },
          { 
            $set: { 
              titleAr: properArabicTitle
            } 
          }
        );
        
        console.log(`   ✅ Updated successfully`);
        updatedCount++;
      } else {
        console.log(`   ⚠️  Arabic title looks good, skipping`);
        skippedCount++;
      }
    }
    
    console.log(`\n🎉 Specific Arabic title fixes completed!`);
    console.log(`✅ Updated: ${updatedCount} projects`);
    console.log(`⚠️  Skipped: ${skippedCount} projects`);
    
  } catch (error) {
    console.error('❌ Error fixing Arabic titles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

fixSpecificArabicTitles();



