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

async function syncTitleFields() {
  try {
    await connectDB();
    
    console.log('Syncing title fields to match titleEn...\n');
    
    // Get all projects
    const projects = await Project.find({});
    console.log(`Found ${projects.length} total projects\n`);
    
    let updatedCount = 0;
    
    for (const project of projects) {
      // If titleEn exists and is different from title, update title to match titleEn
      if (project.titleEn && project.titleEn !== project.title) {
        console.log(`Updating project: "${project.title}" → "${project.titleEn}"`);
        
        await Project.updateOne(
          { _id: project._id },
          {
            $set: {
              title: project.titleEn
            }
          }
        );
        
        updatedCount++;
      }
    }
    
    console.log(`\n✅ Updated ${updatedCount} projects to sync title with titleEn\n`);
    
    // Show some examples of the updated projects
    console.log('Sample of updated projects:\n');
    const sampleProjects = await Project.find({}).limit(10);
    sampleProjects.forEach((project, index) => {
      console.log(`${index + 1}. title: "${project.title}"`);
      console.log(`   titleEn: "${project.titleEn}"`);
      console.log(`   titleAr: "${project.titleAr}"`);
      console.log(`   category: ${project.category}`);
      console.log('');
    });
    
    console.log('✅ Title field sync completed successfully!');
    
  } catch (error) {
    console.error('Error syncing title fields:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

syncTitleFields();
