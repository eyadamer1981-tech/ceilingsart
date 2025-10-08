const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
// NOTE: We use the TEST database. Set MONGODB_URI to mongodb://localhost:27017/test when running.
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

async function checkProjects() {
  try {
    await connectDB();
    
    console.log('Checking projects in database...');
    
    const projects = await Project.find({}).limit(20);
    console.log(`Found ${projects.length} projects (showing first 20):\n`);
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      if (project.description) {
        console.log(`   Description: ${project.description.substring(0, 100)}...`);
      }
      if (project.category) {
        console.log(`   Category: ${project.category}`);
      }
      if (project.image) {
        console.log(`   Image: ${project.image}`);
      }
      console.log('');
    });
    
    // Check for projects with crazy numbers in titles
    console.log('\nChecking for projects with crazy numbers in titles...');
    const projectsWithNumbers = await Project.find({
      title: { $regex: /\\(\\d+x\\d+\\)/ }
    });
    
    console.log(`Found ${projectsWithNumbers.length} projects with crazy numbers:`);
    projectsWithNumbers.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
    });
    
  } catch (error) {
    console.error('Error checking projects:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkProjects();
