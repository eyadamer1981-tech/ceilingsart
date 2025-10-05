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

async function checkDatabaseFields() {
  try {
    await connectDB();
    
    console.log('Checking database fields for projects...\n');
    
    // Get a few projects to see their actual structure
    const projects = await Project.find({}).limit(5);
    
    console.log('Sample project structure:');
    projects.forEach((project, index) => {
      console.log(`\nProject ${index + 1}:`);
      console.log(`  _id: ${project._id}`);
      console.log(`  title: "${project.title}"`);
      console.log(`  titleEn: "${project.titleEn}"`);
      console.log(`  titleAr: "${project.titleAr}"`);
      console.log(`  descriptionEn: "${project.descriptionEn}"`);
      console.log(`  descriptionAr: "${project.descriptionAr}"`);
      console.log(`  category: "${project.category}"`);
    });
    
    // Check specifically for the UUID projects
    console.log('\n\nChecking for UUID projects specifically:');
    const uuidProjects = await Project.find({
      $or: [
        { title: /96cc8cef/ },
        { titleEn: /96cc8cef/ },
        { title: /H8674afce/ },
        { titleEn: /H8674afce/ }
      ]
    });
    
    console.log(`Found ${uuidProjects.length} UUID projects:`);
    uuidProjects.forEach((project, index) => {
      console.log(`\nUUID Project ${index + 1}:`);
      console.log(`  title: "${project.title}"`);
      console.log(`  titleEn: "${project.titleEn}"`);
      console.log(`  titleAr: "${project.titleAr}"`);
    });
    
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkDatabaseFields();




