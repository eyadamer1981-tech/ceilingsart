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

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String },
  titleEn: { type: String },
  titleAr: { type: String },
  descriptionEn: { type: String },
  descriptionAr: { type: String },
  category: { type: String },
  image: { type: String },
  imageId: { type: mongoose.Schema.Types.ObjectId },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { strict: false });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

async function checkAndFixProjects() {
  try {
    await connectDB();
    
    console.log('Checking all projects in database...\n');
    
    // Get all projects
    const projects = await Project.find({});
    console.log(`Found ${projects.length} total projects\n`);
    
    // Check for UUID-named projects and fix them
    const uuidPattern = /^[0-9a-fA-F\s-]+$/;
    let fixedCount = 0;
    
    for (const project of projects) {
      const currentTitle = project.title || project.titleEn || '';
      
      // Check if title looks like a UUID
      if (uuidPattern.test(currentTitle) && currentTitle.length > 20) {
        console.log(`Found UUID-named project: "${currentTitle}"`);
        
        let newTitleEn, newTitleAr, newDescEn, newDescAr;
        
        // Determine new names based on category and content
        if (project.category === 'Stretch Ceiling') {
          if (currentTitle.includes('96cc8cef')) {
            newTitleEn = 'French Paper Stretch Ceiling';
            newTitleAr = 'سقف فرنسي مشدود من الورق';
            newDescEn = 'Elegant French paper stretch ceiling with natural texture and sophisticated design';
            newDescAr = 'سقف فرنسي مشدود أنيق من الورق مع نسيج طبيعي وتصميم راقي';
          } else if (currentTitle.includes('H8674afce')) {
            newTitleEn = 'Modern Stretch Ceiling Design';
            newTitleAr = 'تصميم سقف مشدود عصري';
            newDescEn = 'Contemporary stretch ceiling featuring modern design elements and premium materials';
            newDescAr = 'سقف مشدود معاصر يتميز بعناصر تصميم حديثة ومواد عالية الجودة';
          } else {
            newTitleEn = 'Premium Stretch Ceiling';
            newTitleAr = 'سقف مشدود فاخر';
            newDescEn = 'High-quality stretch ceiling with premium materials and professional installation';
            newDescAr = 'سقف مشدود عالي الجودة مع مواد فاخرة وتركيب مهني';
          }
        } else {
          newTitleEn = 'Professional Acoustic Panel';
          newTitleAr = 'لوح صوتي مهني';
          newDescEn = 'High-quality acoustic panel for superior sound control';
          newDescAr = 'لوح صوتي عالي الجودة للتحكم المتفوق في الصوت';
        }
        
        // Update the project
        await Project.updateOne(
          { _id: project._id },
          {
            $set: {
              titleEn: newTitleEn,
              titleAr: newTitleAr,
              descriptionEn: newDescEn,
              descriptionAr: newDescAr
            }
          }
        );
        
        console.log(`  ✅ Updated to: "${newTitleEn}" / "${newTitleAr}"`);
        fixedCount++;
      }
    }
    
    console.log(`\nFixed ${fixedCount} UUID-named projects\n`);
    
    // Now show all projects with their proper titles
    console.log('All projects with proper titles:\n');
    const allProjects = await Project.find({}).sort({ createdAt: -1 });
    
    allProjects.forEach((project, index) => {
      const titleEn = project.titleEn || project.title || 'No title';
      const titleAr = project.titleAr || 'لا يوجد عنوان';
      console.log(`${index + 1}. English: "${titleEn}"`);
      console.log(`   Arabic: "${titleAr}"`);
      console.log(`   Category: ${project.category}`);
      console.log('');
    });
    
    console.log('✅ Project name fixes completed successfully!');
    
  } catch (error) {
    console.error('Error fixing project names:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkAndFixProjects();
