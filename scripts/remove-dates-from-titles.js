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

// Function to remove date patterns from titles
function removeDatesFromTitle(title) {
  if (!title) return title;
  
  // Common date patterns to remove
  const datePatterns = [
    // YYYY-MM-DD patterns
    /\d{4}-\d{2}-\d{2}/g,
    // YYYY MM DD patterns
    /\d{4}\s+\d{2}\s+\d{2}/g,
    // DD-MM-YYYY patterns
    /\d{2}-\d{2}-\d{4}/g,
    // DD MM YYYY patterns
    /\d{2}\s+\d{2}\s+\d{4}/g,
    // MM-DD-YYYY patterns
    /\d{2}-\d{2}-\d{4}/g,
    // MM DD YYYY patterns
    /\d{2}\s+\d{2}\s+\d{4}/g,
    // YYYY/MM/DD patterns
    /\d{4}\/\d{2}\/\d{2}/g,
    // DD/MM/YYYY patterns
    /\d{2}\/\d{2}\/\d{4}/g,
    // MM/DD/YYYY patterns
    /\d{2}\/\d{2}\/\d{4}/g,
    // YYYY.MM.DD patterns
    /\d{4}\.\d{2}\.\d{2}/g,
    // DD.MM.YYYY patterns
    /\d{2}\.\d{2}\.\d{4}/g,
    // MM.DD.YYYY patterns
    /\d{2}\.\d{2}\.\d{4}/g,
    // YYYY_MM_DD patterns
    /\d{4}_\d{2}_\d{2}/g,
    // DD_MM_YYYY patterns
    /\d{2}_\d{2}_\d{4}/g,
    // MM_DD_YYYY patterns
    /\d{2}_\d{2}_\d{4}/g,
    // YYYY patterns (standalone years)
    /\b\d{4}\b/g,
    // Month names with dates
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi,
    // Short month names with dates
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}\b/gi,
    // Arabic month patterns (if any)
    /\b(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{1,2},?\s+\d{4}\b/g,
    // Time patterns (HH:MM:SS)
    /\d{2}:\d{2}:\d{2}/g,
    // Time patterns (HH:MM)
    /\d{2}:\d{2}/g,
    // AM/PM patterns
    /\d{1,2}:\d{2}\s*(AM|PM)/gi,
    // Specific patterns found in the project titles
    /E\d{13}/g, // E followed by 13 digits (timestamp)
    /\d{4}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}/g, // Full datetime
    /\d{4}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{1}/g, // Full datetime with extra digit
  ];
  
  let cleanedTitle = title;
  
  // Apply each pattern
  datePatterns.forEach(pattern => {
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

// Function to generate better titles based on content
function generateBetterTitle(originalTitle, category) {
  const cleanedTitle = removeDatesFromTitle(originalTitle);
  
  // If the cleaned title is too short or generic, create a better one
  if (cleanedTitle.length < 5 || cleanedTitle.toLowerCase().includes('photo') || cleanedTitle.toLowerCase().includes('img')) {
    
    // Generate title based on category and content
    if (category && category.toLowerCase().includes('stretch')) {
      if (cleanedTitle.toLowerCase().includes('mirror')) {
        return {
          titleEn: 'Mirror Stretch Ceiling Design',
          titleAr: 'تصميم سقف مشدود مرآة'
        };
      } else if (cleanedTitle.toLowerCase().includes('printed')) {
        return {
          titleEn: 'Printed Stretch Ceiling Installation',
          titleAr: 'تركيب سقف مشدود مطبوع'
        };
      } else if (cleanedTitle.toLowerCase().includes('glossy')) {
        return {
          titleEn: 'Glossy Stretch Ceiling Design',
          titleAr: 'تصميم سقف مشدود لامع'
        };
      } else {
        return {
          titleEn: 'Modern Stretch Ceiling Project',
          titleAr: 'مشروع سقف مشدود عصري'
        };
      }
    } else if (category && category.toLowerCase().includes('acoustic')) {
      return {
        titleEn: 'Acoustic Panel Installation',
        titleAr: 'تركيب لوح صوتي'
      };
    } else {
      return {
        titleEn: 'Professional Ceiling Installation',
        titleAr: 'تركيب سقف احترافي'
      };
    }
  }
  
  return {
    titleEn: cleanedTitle,
    titleAr: cleanedTitle // Will be updated separately if needed
  };
}

async function removeDatesFromProjectTitles() {
  try {
    await connectDB();
    console.log('🔍 Starting date removal from project titles...\n');
    
    const projects = await Project.find({});
    console.log(`📊 Found ${projects.length} total projects\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const project of projects) {
      console.log(`\n🔍 Processing: "${project.title}"`);
      console.log(`   Current titleEn: "${project.titleEn}"`);
      console.log(`   Current titleAr: "${project.titleAr}"`);
      
      // Check if any title contains date patterns
      const hasDates = /\d{4}|\d{2}:\d{2}|E\d{13}/.test(project.title || '') ||
                      /\d{4}|\d{2}:\d{2}|E\d{13}/.test(project.titleEn || '') ||
                      /\d{4}|\d{2}:\d{2}|E\d{13}/.test(project.titleAr || '');
      
      if (hasDates) {
        console.log(`   ✅ Found dates, cleaning...`);
        
        // Clean the titles
        const cleanedTitleEn = removeDatesFromTitle(project.titleEn || project.title);
        const cleanedTitleAr = removeDatesFromTitle(project.titleAr || project.title);
        
        // Generate better titles if needed
        const betterTitles = generateBetterTitle(project.title, project.category);
        
        const finalTitleEn = cleanedTitleEn.length > 5 ? cleanedTitleEn : betterTitles.titleEn;
        const finalTitleAr = cleanedTitleAr.length > 5 ? cleanedTitleAr : betterTitles.titleAr;
        
        console.log(`   📝 New titleEn: "${finalTitleEn}"`);
        console.log(`   📝 New titleAr: "${finalTitleAr}"`);
        
        await Project.updateOne(
          { _id: project._id },
          { 
            $set: { 
              titleEn: finalTitleEn,
              titleAr: finalTitleAr,
              title: finalTitleEn // Also update the main title field
            } 
          }
        );
        
        console.log(`   ✅ Updated successfully`);
        updatedCount++;
      } else {
        console.log(`   ⚠️  No dates found, skipping`);
        skippedCount++;
      }
    }
    
    console.log(`\n🎉 Date removal completed!`);
    console.log(`✅ Updated: ${updatedCount} projects`);
    console.log(`⚠️  Skipped: ${skippedCount} projects`);
    
  } catch (error) {
    console.error('❌ Error removing dates from project titles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

removeDatesFromProjectTitles();



