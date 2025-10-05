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

// Comprehensive mapping of project names to proper titles
const projectMappings = {
  // AJC Syd Grammar Library projects
  'AJC Syd Grammar Library 050': {
    titleEn: 'AJC Sydney Grammar Library - Study Area',
    titleAr: 'مكتبة سيدني النحوية - منطقة الدراسة'
  },
  'AJC Syd Grammar Library 085': {
    titleEn: 'AJC Sydney Grammar Library - Reading Room',
    titleAr: 'مكتبة سيدني النحوية - قاعة القراءة'
  },
  'AJC Syd Grammar Library 002': {
    titleEn: 'AJC Sydney Grammar Library - Main Hall',
    titleAr: 'مكتبة سيدني النحوية - القاعة الرئيسية'
  },
  
  // Ape Yakitori Bar
  'Ape Yakitori Bar Prevalent 2 E1680670793582': {
    titleEn: 'Ape Yakitori Bar - Modern Dining',
    titleAr: 'مطعم أب ياكيتوري - تناول عصري'
  },
  
  // Axis Productions
  'Axis Productions AU 28 Of 187': {
    titleEn: 'Axis Productions Studio - Professional Setup',
    titleAr: 'استوديو أكسيس برودكشنز - إعداد احترافي'
  },
  
  // NEWMAT projects
  'NEWMAT Mirror Museum 1': {
    titleEn: 'NEWMAT Mirror Museum - Exhibition Hall',
    titleAr: 'متحف المرايا نيو مات - قاعة المعرض'
  },
  'NEWMAT Mirror Museum 2': {
    titleEn: 'NEWMAT Mirror Museum - Gallery Space',
    titleAr: 'متحف المرايا نيو مات - مساحة المعرض'
  },
  'NEWMAT Mirror Restaurant': {
    titleEn: 'NEWMAT Mirror Restaurant - Elegant Dining',
    titleAr: 'مطعم المرايا نيو مات - تناول أنيق'
  },
  'NEWMAT Mirror Spa': {
    titleEn: 'NEWMAT Mirror Spa - Luxury Wellness',
    titleAr: 'سبا المرايا نيو مات - رفاهية فاخرة'
  },
  'NEWMAT Silver Mirror': {
    titleEn: 'NEWMAT Silver Mirror - Premium Design',
    titleAr: 'مرآة الفضة نيو مات - تصميم مميز'
  },
  'NEWMAT Living Room Printed Wall Scaled': {
    titleEn: 'NEWMAT Living Room - Printed Wall Design',
    titleAr: 'غرفة المعيشة نيو مات - تصميم جدار مطبوع'
  },
  'NEWMAT Residential Printed Ceiling': {
    titleEn: 'NEWMAT Residential - Printed Ceiling',
    titleAr: 'سكني نيو مات - سقف مطبوع'
  },
  
  // Hengar Manor
  'Hengar Manor 2': {
    titleEn: 'Hengar Manor - Luxury Residence',
    titleAr: 'مانور هينجار - إقامة فاخرة'
  },
  
  // Imperial projects
  'Imperial Printed Stretch Ceiling Sekkoya 1': {
    titleEn: 'Imperial Sekkoya - Printed Stretch Ceiling',
    titleAr: 'إمبريال سيكويا - سقف مشدود مطبوع'
  },
  
  // Photo projects with dates
  'Photo 2023 04 25 18 18 23 1': {
    titleEn: 'Modern Stretch Ceiling Installation - April 2023',
    titleAr: 'تركيب سقف مشدود عصري - أبريل 2023'
  },
  'Photo 2024 10 02 12 52 41 1': {
    titleEn: 'Contemporary Ceiling Design - October 2024',
    titleAr: 'تصميم سقف معاصر - أكتوبر 2024'
  },
  'Photo 2024 10 02 12 52 41 6': {
    titleEn: 'Premium Stretch Ceiling - October 2024',
    titleAr: 'سقف مشدود مميز - أكتوبر 2024'
  },
  'Photo 2024 10 04 11 55 39 1': {
    titleEn: 'Elegant Ceiling Solution - October 2024',
    titleAr: 'حل سقف أنيق - أكتوبر 2024'
  },
  
  // Screen Shot projects
  'Screen Shot 2023 07 03 At 4 56 38 Pm': {
    titleEn: 'Professional Ceiling Installation - July 2023',
    titleAr: 'تركيب سقف احترافي - يوليو 2023'
  },
  
  // Stretch Ceiling Examples
  'Streched Ceiling Example 5': {
    titleEn: 'Stretch Ceiling Design - Example 5',
    titleAr: 'تصميم سقف مشدود - مثال 5'
  },
  'Streched Ceiling Example 7': {
    titleEn: 'Stretch Ceiling Design - Example 7',
    titleAr: 'تصميم سقف مشدود - مثال 7'
  },
  
  // Address projects
  '1ShelleyStTobyPeethighres': {
    titleEn: '1 Shelley Street - Toby Pee Residence',
    titleAr: 'شارع شيللي 1 - إقامة توبي بي'
  },
  
  // Date projects
  '2025 05 22': {
    titleEn: 'Modern Ceiling Installation - May 2025',
    titleAr: 'تركيب سقف عصري - مايو 2025'
  },
  
  // Kent projects
  '250124 WMK 383Kent Specie 0039 HDR 2': {
    titleEn: 'Kent Species - Professional Installation',
    titleAr: 'كنت سبيشيز - تركيب احترافي'
  },
  
  // Image projects
  'Img 1196': {
    titleEn: 'Contemporary Stretch Ceiling Design',
    titleAr: 'تصميم سقف مشدود معاصر'
  },
  '2d1a0410': {
    titleEn: 'Modern Ceiling Solution',
    titleAr: 'حل سقف عصري'
  },
  '2d1a04106': {
    titleEn: 'Premium Ceiling Design',
    titleAr: 'تصميم سقف مميز'
  },
  
  // Car Photo Studio
  'Car Photo Studio 2': {
    titleEn: 'Car Photo Studio - Professional Setup',
    titleAr: 'استوديو تصوير السيارات - إعداد احترافي'
  }
};

async function fixProjectNames() {
  try {
    await connectDB();
    console.log('🔍 Starting comprehensive project name fix...\n');
    
    const projects = await Project.find({});
    console.log(`📊 Found ${projects.length} total projects\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const project of projects) {
      console.log(`\n🔍 Processing: "${project.title}"`);
      console.log(`   Current titleEn: "${project.titleEn}"`);
      console.log(`   Current titleAr: "${project.titleAr}"`);
      
      // Check if we have a mapping for this project
      const mapping = projectMappings[project.title];
      
      if (mapping) {
        console.log(`   ✅ Found mapping: "${mapping.titleEn}" / "${mapping.titleAr}"`);
        
        await Project.updateOne(
          { _id: project._id },
          { 
            $set: { 
              titleEn: mapping.titleEn,
              titleAr: mapping.titleAr,
              title: mapping.titleEn // Also update the main title field
            } 
          }
        );
        
        console.log(`   ✅ Updated successfully`);
        updatedCount++;
      } else {
        // Check if it's a generic "أسقف مشدودة" case
        if (project.titleAr === 'أسقف مشدودة' || project.titleAr === 'Stretch Ceiling') {
          // Generate a more descriptive Arabic title based on English title
          let newTitleAr = '';
          
          if (project.titleEn && project.titleEn !== 'Stretch Ceiling') {
            // Use the English title as base for Arabic translation
            if (project.titleEn.includes('Library')) {
              newTitleAr = 'مكتبة مع أسقف مشدودة';
            } else if (project.titleEn.includes('Restaurant')) {
              newTitleAr = 'مطعم مع أسقف مشدودة';
            } else if (project.titleEn.includes('Spa')) {
              newTitleAr = 'سبا مع أسقف مشدودة';
            } else if (project.titleEn.includes('Museum')) {
              newTitleAr = 'متحف مع أسقف مشدودة';
            } else if (project.titleEn.includes('Studio')) {
              newTitleAr = 'استوديو مع أسقف مشدودة';
            } else if (project.titleEn.includes('Residential')) {
              newTitleAr = 'سكني مع أسقف مشدودة';
            } else if (project.titleEn.includes('Living Room')) {
              newTitleAr = 'غرفة معيشة مع أسقف مشدودة';
            } else {
              newTitleAr = `مشروع ${project.titleEn} مع أسقف مشدودة`;
            }
            
            await Project.updateOne(
              { _id: project._id },
              { $set: { titleAr: newTitleAr } }
            );
            
            console.log(`   ✅ Updated Arabic title to: "${newTitleAr}"`);
            updatedCount++;
          } else {
            console.log(`   ⚠️  Skipped - no English title to work with`);
            skippedCount++;
          }
        } else {
          console.log(`   ⚠️  Skipped - no mapping found and not generic`);
          skippedCount++;
        }
      }
    }
    
    console.log(`\n🎉 Fix completed!`);
    console.log(`✅ Updated: ${updatedCount} projects`);
    console.log(`⚠️  Skipped: ${skippedCount} projects`);
    
  } catch (error) {
    console.error('❌ Error fixing project names:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

fixProjectNames();
