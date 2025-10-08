const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
// NOTE: We use the TEST database. Set MONGODB_URI to mongodb://localhost:27017/test when running.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/art-ceiling');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String },
  titleEn: { type: String },
  titleAr: { type: String },
  descriptionEn: { type: String },
  descriptionAr: { type: String },
  category: { type: String },
  image: { type: String },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String },
  titleEn: { type: String },
  titleAr: { type: String },
  descriptionEn: { type: String },
  descriptionAr: { type: String },
  image: { type: String },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  category: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

const migrateServices = async () => {
  try {
    console.log('Starting services migration...');
    
    // Find all services that have the old 'title' field but not the new title fields
    const services = await Service.find({
      title: { $exists: true },
      $or: [
        { titleEn: { $exists: false } },
        { titleAr: { $exists: false } }
      ]
    });

    console.log(`Found ${services.length} services to migrate`);

    for (const service of services) {
      const updateData = {
        titleEn: service.title || 'Service Title',
        titleAr: service.title || 'عنوان الخدمة'
      };

      await Service.findByIdAndUpdate(service._id, updateData);
      console.log(`Migrated service: ${service.title} -> ${updateData.titleEn}`);
    }

    console.log('Services migration completed');
  } catch (error) {
    console.error('Error migrating services:', error);
  }
};

const migrateProjects = async () => {
  try {
    console.log('Starting projects migration...');
    
    // Find all projects that have the old 'title' field but not the new title fields
    const projects = await Project.find({
      title: { $exists: true },
      $or: [
        { titleEn: { $exists: false } },
        { titleAr: { $exists: false } }
      ]
    });

    console.log(`Found ${projects.length} projects to migrate`);

    for (const project of projects) {
      const updateData = {
        titleEn: project.title || 'Project Title',
        titleAr: project.title || 'عنوان المشروع'
      };

      await Project.findByIdAndUpdate(project._id, updateData);
      console.log(`Migrated project: ${project.title} -> ${updateData.titleEn}`);
    }

    console.log('Projects migration completed');
  } catch (error) {
    console.error('Error migrating projects:', error);
  }
};

const main = async () => {
  await connectDB();
  
  console.log('Starting title migration...');
  await migrateServices();
  await migrateProjects();
  
  console.log('Migration completed successfully!');
  process.exit(0);
};

main().catch(error => {
  console.error('Migration failed:', error);
  process.exit(1);
});


