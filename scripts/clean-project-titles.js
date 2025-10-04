const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/art-website';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  detailImages: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { strict: false });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

function cleanTitle(title) {
  if (!title) return title;
  
  // Remove patterns like "1024x683", "1024x690", etc.
  let cleaned = title
    // Remove dimensions like "1024x683", "1024x690", etc.
    .replace(/\s+\d+x\d+\s*/g, ' ')
    // Remove standalone numbers at the end like "1", "15", etc.
    .replace(/\s+\d+\s*$/g, '')
    // Remove "Jpg" at the end
    .replace(/\s+Jpg\s*$/g, '')
    // Remove extra spaces
    .replace(/\s+/g, ' ')
    .trim();
  
  return cleaned;
}

async function cleanProjectTitles() {
  try {
    await connectDB();
    
    console.log('Cleaning project titles...\n');
    
    // Find all projects
    const projects = await Project.find({});
    console.log(`Found ${projects.length} projects to check\n`);
    
    let cleanedCount = 0;
    
    for (const project of projects) {
      const originalTitle = project.title;
      const cleanedTitle = cleanTitle(originalTitle);
      
      if (originalTitle !== cleanedTitle) {
        console.log(`Cleaning: "${originalTitle}"`);
        console.log(`    → "${cleanedTitle}"`);
        
        await Project.findByIdAndUpdate(project._id, { title: cleanedTitle });
        cleanedCount++;
        console.log('');
      }
    }
    
    console.log(`✅ Successfully cleaned ${cleanedCount} project titles`);
    
    // Show some examples of cleaned titles
    console.log('\nSample of cleaned projects:');
    const sampleProjects = await Project.find({}).limit(10);
    sampleProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
    });
    
  } catch (error) {
    console.error('Error cleaning project titles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

cleanProjectTitles();
