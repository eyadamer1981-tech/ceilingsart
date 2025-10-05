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

// Function to clean up project titles completely
function cleanProjectTitle(title, category) {
  if (!title) return title;
  
  let cleanedTitle = title;
  
  // Remove all number patterns that look like dates, dimensions, or file numbers
  const patternsToRemove = [
    // Date patterns
    /\d{4}-\d{2}-\d{2}/g,
    /\d{4}\s+\d{2}\s+\d{2}/g,
    /\d{2}-\d{2}-\d{4}/g,
    /\d{2}\s+\d{2}\s+\d{4}/g,
    /\d{4}\/\d{2}\/\d{2}/g,
    /\d{2}\/\d{2}\/\d{4}/g,
    /\d{4}\.\d{2}\.\d{2}/g,
    /\d{2}\.\d{2}\.\d{4}/g,
    /\d{4}_\d{2}_\d{2}/g,
    /\d{2}_\d{2}_\d{4}/g,
    // Time patterns
    /\d{2}:\d{2}:\d{2}/g,
    /\d{2}:\d{2}/g,
    /\d{1,2}:\d{2}\s*(AM|PM)/gi,
    // File number patterns
    /E\d{13}/g,
    /\d{4}x\d{3,4}/g, // dimensions like 1024x768
    /\d{3,4}x\d{3,4}/g, // dimensions like 1024x768
    // Photo/Image patterns
    /Photo\s+\d+/gi,
    /IMG\s+\d+/gi,
    /Img\s+\d+/gi,
    /DSC\d+/gi,
    // Version patterns
    /V\d+/gi,
    /LOWRES/gi,
    /Scaled/gi,
    // Random number sequences
    /\d{6,}/g, // sequences of 6+ digits
    /\d{4}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}/g, // full datetime
    /\d{4}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{1}/g, // full datetime with extra
  ];
  
  // Apply each pattern
  patternsToRemove.forEach(pattern => {
    cleanedTitle = cleanedTitle.replace(pattern, '');
  });
  
  // Clean up extra spaces and punctuation
  cleanedTitle = cleanedTitle
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .replace(/\s*-\s*/g, ' - ') // Clean up dashes
    .replace(/\s*,\s*/g, ', ') // Clean up commas
    .replace(/\s*\.\s*/g, '. ') // Clean up periods
    .replace(/\s*Jpg\s*/gi, '') // Remove Jpg
    .replace(/\s*Jpeg\s*/gi, '') // Remove Jpeg
    .replace(/\s*Png\s*/gi, '') // Remove Png
    .trim(); // Remove leading/trailing spaces
  
  // Generate better titles for generic or poor titles
  if (cleanedTitle.length < 5 || 
      cleanedTitle.toLowerCase().includes('photo') || 
      cleanedTitle.toLowerCase().includes('img') ||
      cleanedTitle.toLowerCase().includes('dsc') ||
      cleanedTitle.match(/^\d+$/)) {
    
    if (category && category.toLowerCase().includes('stretch')) {
      if (cleanedTitle.toLowerCase().includes('mirror')) {
        return 'Mirror Stretch Ceiling Design';
      } else if (cleanedTitle.toLowerCase().includes('printed')) {
        return 'Printed Stretch Ceiling Installation';
      } else if (cleanedTitle.toLowerCase().includes('glossy')) {
        return 'Glossy Stretch Ceiling Design';
      } else if (cleanedTitle.toLowerCase().includes('pool') || cleanedTitle.toLowerCase().includes('spa')) {
        return 'Pool & Spa Ceiling Design';
      } else {
        return 'Modern Stretch Ceiling Project';
      }
    } else if (category && category.toLowerCase().includes('acoustic')) {
      return 'Acoustic Panel Installation';
    } else {
      return 'Professional Ceiling Installation';
    }
  }
  
  return cleanedTitle;
}

// Generate Arabic translation for English titles
function generateArabicTitle(englishTitle) {
  const translations = {
    'Mirror Stretch Ceiling Design': 'تصميم سقف مشدود مرآة',
    'Printed Stretch Ceiling Installation': 'تركيب سقف مشدود مطبوع',
    'Glossy Stretch Ceiling Design': 'تصميم سقف مشدود لامع',
    'Pool & Spa Ceiling Design': 'تصميم سقف للمسبح والسبا',
    'Modern Stretch Ceiling Project': 'مشروع سقف مشدود عصري',
    'Acoustic Panel Installation': 'تركيب لوح صوتي',
    'Professional Ceiling Installation': 'تركيب سقف احترافي',
    'Contemporary Stretch Ceiling Design': 'تصميم سقف مشدود معاصر',
    'Premium Stretch Ceiling': 'سقف مشدود مميز',
    'Elegant Ceiling Solution': 'حل سقف أنيق',
    'Modern Ceiling Installation': 'تركيب سقف عصري',
    'Modern Ceiling Solution': 'حل سقف عصري',
    'Kent Species - Professional Installation': 'كنت سبيشيز - تركيب احترافي',
    'Car Photo Studio - Professional Setup': 'استوديو تصوير السيارات - إعداد احترافي',
    'AJC Sydney Grammar Library - Main Hall': 'مكتبة سيدني النحوية - القاعة الرئيسية',
    'AJC Sydney Grammar Library - Study Area': 'مكتبة سيدني النحوية - منطقة الدراسة',
    'AJC Sydney Grammar Library - Reading Room': 'مكتبة سيدني النحوية - قاعة القراءة',
    'Ape Yakitori Bar - Modern Dining': 'مطعم أب ياكيتوري - تناول عصري',
    'Axis Productions Studio - Professional Setup': 'استوديو أكسيس برودكشنز - إعداد احترافي',
    'Hengar Manor - Luxury Residence': 'مانور هينجار - إقامة فاخرة',
    'Imperial Sekkoya - Printed Stretch Ceiling': 'إمبريال سيكويا - سقف مشدود مطبوع',
    'NEWMAT Living Room - Printed Wall Design': 'غرفة المعيشة نيو مات - تصميم جدار مطبوع',
    'NEWMAT Residential - Printed Ceiling': 'سكني نيو مات - سقف مطبوع',
    'NEWMAT Mirror Museum - Exhibition Hall': 'متحف المرايا نيو مات - قاعة المعرض',
    'NEWMAT Mirror Museum - Gallery Space': 'متحف المرايا نيو مات - مساحة المعرض',
    'NEWMAT Mirror Restaurant - Elegant Dining': 'مطعم المرايا نيو مات - تناول أنيق',
    'NEWMAT Mirror Spa - Luxury Wellness': 'سبا المرايا نيو مات - رفاهية فاخرة',
    'NEWMAT Silver Mirror - Premium Design': 'مرآة الفضة نيو مات - تصميم مميز',
    'Stretch Ceiling Design - Example 5': 'تصميم سقف مشدود - مثال 5',
    'Stretch Ceiling Design - Example 7': 'تصميم سقف مشدود - مثال 7',
    '1 Shelley Street - Toby Pee Residence': 'شارع شيللي 1 - إقامة توبي بي',
  };
  
  return translations[englishTitle] || englishTitle;
}

async function cleanAllProjectTitles() {
  try {
    await connectDB();
    console.log('🔍 Starting comprehensive project title cleanup...\n');
    
    const projects = await Project.find({});
    console.log(`📊 Found ${projects.length} total projects\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const project of projects) {
      console.log(`\n🔍 Processing: "${project.title}"`);
      console.log(`   Current titleEn: "${project.titleEn}"`);
      console.log(`   Current titleAr: "${project.titleAr}"`);
      
      // Clean the English title
      const cleanedTitleEn = cleanProjectTitle(project.titleEn || project.title, project.category);
      const cleanedTitleAr = generateArabicTitle(cleanedTitleEn);
      
      // Check if titles need updating
      if (cleanedTitleEn !== (project.titleEn || project.title) || cleanedTitleAr !== project.titleAr) {
        console.log(`   📝 New titleEn: "${cleanedTitleEn}"`);
        console.log(`   📝 New titleAr: "${cleanedTitleAr}"`);
        
        await Project.updateOne(
          { _id: project._id },
          { 
            $set: { 
              titleEn: cleanedTitleEn,
              titleAr: cleanedTitleAr,
              title: cleanedTitleEn // Also update the main title field
            } 
          }
        );
        
        console.log(`   ✅ Updated successfully`);
        updatedCount++;
      } else {
        console.log(`   ⚠️  No changes needed, skipping`);
        skippedCount++;
      }
    }
    
    console.log(`\n🎉 Title cleanup completed!`);
    console.log(`✅ Updated: ${updatedCount} projects`);
    console.log(`⚠️  Skipped: ${skippedCount} projects`);
    
  } catch (error) {
    console.error('❌ Error cleaning project titles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

cleanAllProjectTitles();


