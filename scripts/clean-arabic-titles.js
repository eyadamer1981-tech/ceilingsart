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

// Function to remove dates from Arabic titles
function removeDatesFromArabicTitle(arabicTitle) {
  if (!arabicTitle) return arabicTitle;
  
  let cleanedTitle = arabicTitle;
  
  // Arabic month names and date patterns
  const arabicDatePatterns = [
    // Arabic months with years
    /\b(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{4}\b/g,
    // Arabic months with days and years
    /\b(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{1,2},?\s+\d{4}\b/g,
    // Years in Arabic context
    /\b\d{4}\b/g,
    // Date patterns with Arabic text
    /\d{4}-\d{2}-\d{2}/g,
    /\d{4}\s+\d{2}\s+\d{2}/g,
    /\d{2}-\d{2}-\d{4}/g,
    /\d{2}\s+\d{2}\s+\d{4}/g,
    // Time patterns
    /\d{2}:\d{2}:\d{2}/g,
    /\d{2}:\d{2}/g,
    // File number patterns
    /E\d{13}/g,
    // Dimensions
    /\d{4}x\d{3,4}/g,
    /\d{3,4}x\d{3,4}/g,
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
    /\d{6,}/g,
    // Specific patterns that might appear in Arabic titles
    /\d{4}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}/g,
    /\d{4}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{1}/g,
  ];
  
  // Apply each pattern
  arabicDatePatterns.forEach(pattern => {
    cleanedTitle = cleanedTitle.replace(pattern, '');
  });
  
  // Clean up extra spaces and punctuation
  cleanedTitle = cleanedTitle
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .replace(/\s*-\s*/g, ' - ') // Clean up dashes
    .replace(/\s*,\s*/g, ', ') // Clean up commas
    .replace(/\s*\.\s*/g, '. ') // Clean up periods
    .trim(); // Remove leading/trailing spaces
  
  return cleanedTitle;
}

// Generate proper Arabic titles for English titles
function generateProperArabicTitle(englishTitle) {
  const translations = {
    // Basic stretch ceiling types
    'Modern Stretch Ceiling Design': 'تصميم سقف مشدود عصري',
    'French Paper Stretch Ceiling': 'سقف فرنسي مشدود من الورق',
    'Premium Stretch Ceiling': 'سقف مشدود مميز',
    'Glossy Stretch Ceiling': 'سقف مشدود لامع',
    'Printed Stretch Ceiling': 'سقف مشدود مطبوع',
    'Mirror Stretch Ceiling': 'سقف مشدود مرآة',
    'Translucent Stretch Ceiling': 'سقف مشدود شفاف',
    'Fiber Optic Stretch Ceiling': 'سقف مشدود بألياف بصرية',
    
    // Installation types
    'Modern Stretch Ceiling Installation': 'تركيب سقف مشدود عصري',
    'Professional Ceiling Installation': 'تركيب سقف احترافي',
    'Contemporary Ceiling Design': 'تصميم سقف معاصر',
    'Elegant Ceiling Solution': 'حل سقف أنيق',
    'Modern Ceiling Solution': 'حل سقف عصري',
    'Modern Ceiling Installation': 'تركيب سقف عصري',
    
    // Specific projects
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
    'Kent Species - Professional Installation': 'كنت سبيشيز - تركيب احترافي',
    'Car Photo Studio - Professional Setup': 'استوديو تصوير السيارات - إعداد احترافي',
    
    // Acoustic panels
    'Polyester Acoustic Panels': 'ألواح صوتية من البوليستر',
    'Wall Acoustic Treatment': 'معالجة صوتية للجدران',
    'Studio Acoustic Panels': 'ألواح صوتية للاستوديو',
    'Baffle Ceiling System': 'نظام سقف مموج',
    
    // Generic projects
    'Modern Stretch Ceiling Project': 'مشروع سقف مشدود عصري',
    'Professional Ceiling Project': 'مشروع سقف احترافي',
    'Contemporary Ceiling Project': 'مشروع سقف معاصر',
    
    // Pool and spa
    'Pool & Spa Ceiling Design': 'تصميم سقف للمسبح والسبا',
    'Pool Spa1': 'سقف مشدود للمسبح والسبا 1',
    'Pool Spa3': 'سقف مشدود للمسبح والسبا 3',
    'Pool Spa6': 'سقف مشدود للمسبح والسبا 6',
    
    // Star ceilings
    'Star Ceiling2': 'سقف النجوم 2',
    'Star Ceiling3': 'سقف النجوم 3',
    'Star Ceiling5': 'سقف النجوم 5',
    'Star Ceiling7': 'سقف النجوم 7',
    'Star Ceiling8': 'سقف النجوم 8',
    'Starceiling6': 'سقف النجوم 6',
    
    // High gloss installations
    'High Gloss Ceiling Installation In The Bathroom': 'تركيب سقف لامع في الحمام',
    'High Gloss Ceiling Installation On The Kitchen': 'تركيب سقف لامع في المطبخ',
    'Luxury Condo Family Room With Multilevel Red Stretch Ceiling Deutchland': 'غرفة عائلية فاخرة بسقف مشدود أحمر متعدد المستويات',
    'Multilevel Waved Reflective White Glossy Stretch Ceiling In Monopoly': 'سقف مشدود أبيض لامع متعدد المستويات مع موجات عاكسة',
    
    // Merchandise and commercial
    'Merchandise Mart': 'مركز التجارة',
    
    // Wood wool panels
    'AS WoodWool CeilingPanel Office 15': 'لوح سقف من الصوف الخشبي للمكتب 15',
    'Baux Wood Wool Panels Ona634 9': 'ألواح الصوف الخشبي بوكس أونا 634',
    
    // Site photos
    '3 Site': 'موقع المشروع 3',
    
    // Lightboxes
    'Lightboxes 03': 'صناديق الإضاءة 03',
    'Lightboxes 05': 'صناديق الإضاءة 05',
    'Lightboxes 08': 'صناديق الإضاءة 08',
    
    // Mecca projects
    'MeccaBourkeSt1': 'مكة شارع بورك 1',
    'Meccabourkestcarrousel': 'مكة بوركست كاروسيل',
    'Meccacharles2': 'مكة تشارلز 2',
    
    // NEWMAT projects
    'NEWMAT Ceiling Mounted Lightbox': 'نيو مات صندوق إضاءة مثبت على السقف',
    'NEWMAT Suspended Panels Museum': 'نيو مات ألواح معلقة للمتحف',
    'NEWMAT 225george 001': 'نيو مات 225 جورج 001',
    'NEWMAT 225george 002': 'نيو مات 225 جورج 002',
    'NEWMAT 225george 025': 'نيو مات 225 جورج 025',
    'NEWMAT Wsu 001': 'نيو مات دبليو إس يو 001',
    'NEWMAT Wsu 028': 'نيو مات دبليو إس يو 028',
    'NEWMAT Wsu 033': 'نيو مات دبليو إس يو 033',
    'NEWMAT Wsu 038': 'نيو مات دبليو إس يو 038',
    
    // Other projects
    'One Playground Copy': 'نسخة من ملعب واحد',
    'Pagani Manchester': 'باغاني مانشستر',
    'PixelCollective QLDTAFE 2': 'بكسل كولكتيف كيو إل دي تي إيه إف إي 2',
    'Qantas T1 Domestic': 'كانتاس تي 1 محلي',
    'Streched Ceiling Example 1': 'مثال سقف مشدود 1',
    'Streched Ceiling Example 3': 'مثال سقف مشدود 3',
    
    // Generic cleaned titles
    'Coty 01 1': 'كوتي 01 1',
    'DesignInc ParramattaTownHall': 'ديزاين إنك باراماتا تاون هول',
    'DisshChermside BrahmanPerera LillieThompson 01': 'ديش شيرم سايد براهمان بيريرا ليلي تومبسون 01',
    'Futurespace Leaveplus 054 01': 'فيوتشر سبيس ليف بلس 054 01',
    'Futurespace Leaveplus 079 01': 'فيوتشر سبيس ليف بلس 079 01',
    'GenesisDealership 25': 'جينيسيس ديلر شيب 25',
    'GenesisDealership 26': 'جينيسيس ديلر شيب 26',
    'Home HQ': 'هوم إتش كيو',
    'Khosla Ventures 01 1': 'خوسلا فينتشرز 01 1',
    'LED 1': 'إل إي دي 1',
  };
  
  return translations[englishTitle] || englishTitle;
}

async function cleanArabicTitles() {
  try {
    await connectDB();
    console.log('🔍 Starting Arabic title cleanup...\n');
    
    const projects = await Project.find({});
    console.log(`📊 Found ${projects.length} total projects\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const project of projects) {
      console.log(`\n🔍 Processing: "${project.title}"`);
      console.log(`   Current titleEn: "${project.titleEn}"`);
      console.log(`   Current titleAr: "${project.titleAr}"`);
      
      // Check if Arabic title contains dates or needs cleaning
      const hasDatesInArabic = /\d{4}|\d{2}:\d{2}|E\d{13}|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر|يناير|فبراير|مارس/.test(project.titleAr || '');
      
      if (hasDatesInArabic || !project.titleAr || project.titleAr === project.titleEn) {
        console.log(`   ✅ Found dates or needs Arabic translation, cleaning...`);
        
        // Clean the Arabic title
        const cleanedArabicTitle = removeDatesFromArabicTitle(project.titleAr || project.titleEn || project.title);
        
        // Generate proper Arabic title based on English title
        const properArabicTitle = generateProperArabicTitle(project.titleEn || project.title);
        
        // Use the proper Arabic title if the cleaned one is too short or generic
        const finalArabicTitle = cleanedArabicTitle.length > 5 && cleanedArabicTitle !== project.titleEn ? 
          cleanedArabicTitle : properArabicTitle;
        
        console.log(`   📝 New titleAr: "${finalArabicTitle}"`);
        
        await Project.updateOne(
          { _id: project._id },
          { 
            $set: { 
              titleAr: finalArabicTitle
            } 
          }
        );
        
        console.log(`   ✅ Updated successfully`);
        updatedCount++;
      } else {
        console.log(`   ⚠️  No dates found in Arabic title, skipping`);
        skippedCount++;
      }
    }
    
    console.log(`\n🎉 Arabic title cleanup completed!`);
    console.log(`✅ Updated: ${updatedCount} projects`);
    console.log(`⚠️  Skipped: ${skippedCount} projects`);
    
  } catch (error) {
    console.error('❌ Error cleaning Arabic titles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

cleanArabicTitles();



