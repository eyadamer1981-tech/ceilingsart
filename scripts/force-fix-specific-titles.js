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

// Specific fixes for the titles you mentioned
const specificFixes = {
  'Modern Stretch Ceiling Design': 'تصميم سقف مشدود عصري',
  'High Gloss Ceiling Installation In The Bathroom': 'تركيب سقف لامع في الحمام',
  'High Gloss Ceiling Installation On The Kitchen': 'تركيب سقف لامع في المطبخ',
  'Luxury Condo Family Room With Multilevel Red Stretch Ceiling Deutchland': 'غرفة عائلية فاخرة بسقف مشدود أحمر متعدد المستويات',
  'Multilevel Waved Reflective White Glossy Stretch Ceiling In Monopoly': 'سقف مشدود أبيض لامع متعدد المستويات مع موجات عاكسة',
  'Pool Spa1': 'سقف مشدود للمسبح والسبا 1',
  'Pool Spa3': 'سقف مشدود للمسبح والسبا 3',
  'Pool Spa6': 'سقف مشدود للمسبح والسبا 6',
  'Merchandise Mart': 'مركز التجارة',
  'Modern Stretch Ceiling Installation - April': 'تركيب سقف مشدود عصري - أبريل',
  'Contemporary Ceiling Design - October': 'تصميم سقف معاصر - أكتوبر',
  'Premium Stretch Ceiling - October': 'سقف مشدود مميز - أكتوبر',
  'Elegant Ceiling Solution - October': 'حل سقف أنيق - أكتوبر',
  'Professional Ceiling Installation - July': 'تركيب سقف احترافي - يوليو',
  'Modern Ceiling Installation - May': 'تركيب سقف عصري - مايو',
};

async function forceFixSpecificTitles() {
  try {
    await connectDB();
    console.log('🔍 Force fixing specific Arabic titles...\n');
    
    let updatedCount = 0;
    
    // Fix each specific title
    for (const [englishTitle, arabicTitle] of Object.entries(specificFixes)) {
      console.log(`\n🔍 Looking for: "${englishTitle}"`);
      
      const projects = await Project.find({ 
        $or: [
          { titleEn: englishTitle },
          { title: englishTitle }
        ]
      });
      
      if (projects.length > 0) {
        console.log(`   Found ${projects.length} project(s) with this title`);
        
        for (const project of projects) {
          console.log(`   Current titleAr: "${project.titleAr}"`);
          console.log(`   Setting to: "${arabicTitle}"`);
          
          await Project.updateOne(
            { _id: project._id },
            { 
              $set: { 
                titleAr: arabicTitle
              } 
            }
          );
          
          console.log(`   ✅ Updated successfully`);
          updatedCount++;
        }
      } else {
        console.log(`   ⚠️  No projects found with this exact title`);
      }
    }
    
    // Also fix any projects that still have "أسقف مشدودة" as Arabic title
    console.log(`\n🔍 Looking for projects with generic "أسقف مشدودة" title...`);
    const genericProjects = await Project.find({ titleAr: 'أسقف مشدودة' });
    
    if (genericProjects.length > 0) {
      console.log(`   Found ${genericProjects.length} project(s) with generic Arabic title`);
      
      for (const project of genericProjects) {
        console.log(`\n   Processing: "${project.titleEn || project.title}"`);
        
        // Generate a better Arabic title based on English title
        let betterArabicTitle = 'سقف مشدود';
        
        if (project.titleEn || project.title) {
          const title = (project.titleEn || project.title).toLowerCase();
          
          if (title.includes('modern')) {
            betterArabicTitle = 'سقف مشدود عصري';
          } else if (title.includes('glossy') || title.includes('gloss')) {
            betterArabicTitle = 'سقف مشدود لامع';
          } else if (title.includes('printed')) {
            betterArabicTitle = 'سقف مشدود مطبوع';
          } else if (title.includes('mirror')) {
            betterArabicTitle = 'سقف مشدود مرآة';
          } else if (title.includes('luxury')) {
            betterArabicTitle = 'سقف مشدود فاخر';
          } else if (title.includes('pool') || title.includes('spa')) {
            betterArabicTitle = 'سقف مشدود للمسبح والسبا';
          } else if (title.includes('installation')) {
            betterArabicTitle = 'تركيب سقف احترافي';
          } else if (title.includes('design')) {
            betterArabicTitle = 'تصميم سقف معاصر';
          }
        }
        
        console.log(`   Setting to: "${betterArabicTitle}"`);
        
        await Project.updateOne(
          { _id: project._id },
          { 
            $set: { 
              titleAr: betterArabicTitle
            } 
          }
        );
        
        console.log(`   ✅ Updated successfully`);
        updatedCount++;
      }
    } else {
      console.log(`   No projects found with generic Arabic title`);
    }
    
    // Also fix any projects where Arabic title equals English title
    console.log(`\n🔍 Looking for projects where titleAr equals titleEn...`);
    const identicalProjects = await Project.find({ 
      $expr: { $eq: ["$titleAr", "$titleEn"] }
    });
    
    if (identicalProjects.length > 0) {
      console.log(`   Found ${identicalProjects.length} project(s) with identical titles`);
      
      for (const project of identicalProjects) {
        console.log(`\n   Processing: "${project.titleEn}"`);
        
        // Generate Arabic title based on English title
        let arabicTitle = 'سقف مشدود';
        
        if (project.titleEn) {
          const title = project.titleEn.toLowerCase();
          
          if (title.includes('modern')) {
            arabicTitle = 'سقف مشدود عصري';
          } else if (title.includes('glossy') || title.includes('gloss')) {
            arabicTitle = 'سقف مشدود لامع';
          } else if (title.includes('printed')) {
            arabicTitle = 'سقف مشدود مطبوع';
          } else if (title.includes('mirror')) {
            arabicTitle = 'سقف مشدود مرآة';
          } else if (title.includes('luxury')) {
            arabicTitle = 'سقف مشدود فاخر';
          } else if (title.includes('pool') || title.includes('spa')) {
            arabicTitle = 'سقف مشدود للمسبح والسبا';
          } else if (title.includes('installation')) {
            arabicTitle = 'تركيب سقف احترافي';
          } else if (title.includes('design')) {
            arabicTitle = 'تصميم سقف معاصر';
          } else if (title.includes('solution')) {
            arabicTitle = 'حل سقف احترافي';
          } else if (title.includes('project')) {
            arabicTitle = 'مشروع سقف مشدود';
          }
        }
        
        console.log(`   Setting to: "${arabicTitle}"`);
        
        await Project.updateOne(
          { _id: project._id },
          { 
            $set: { 
              titleAr: arabicTitle
            } 
          }
        );
        
        console.log(`   ✅ Updated successfully`);
        updatedCount++;
      }
    } else {
      console.log(`   No projects found with identical titles`);
    }
    
    console.log(`\n🎉 Force fix completed!`);
    console.log(`✅ Updated: ${updatedCount} projects`);
    
  } catch (error) {
    console.error('❌ Error force fixing titles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

forceFixSpecificTitles();




