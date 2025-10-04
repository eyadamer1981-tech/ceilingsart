const mongoose = require('mongoose');

// Connect to MongoDB Atlas cloud database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://eslamabdullatif21_db_user:oneone2@cluster0.93xn6yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Define Service schema (existing)
const serviceSchema = new mongoose.Schema({
  title: { type: String },
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  detailImages: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Define StretchCeiling schema (new)
const stretchCeilingSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, default: 'Stretch Ceilings' },
  image: { type: String, required: true },
  detailImages: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Define Project schema
const projectSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  image: { type: String, required: true },
  detailImages: { type: [String], default: [] },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
const StretchCeiling = mongoose.models.StretchCeiling || mongoose.model('StretchCeiling', stretchCeilingSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

async function migrateStretchCeilings() {
  try {
    await connectDB();
    
    console.log('Fetching existing stretch ceiling services...');
    const stretchCeilingServices = await Service.find({
      $or: [
        { category: { $regex: /stretch/i } },
        { titleEn: { $regex: /stretch/i } },
        { titleAr: { $regex: /stretch/i } }
      ]
    });
    
    console.log(`Found ${stretchCeilingServices.length} stretch ceiling services:`);
    stretchCeilingServices.forEach((service, index) => {
      console.log(`${index + 1}. ${service.titleEn} (Category: ${service.category})`);
    });
    
    if (stretchCeilingServices.length === 0) {
      console.log('No stretch ceiling services found to migrate.');
      return;
    }
    
    console.log('\nClearing existing stretch ceilings...');
    await StretchCeiling.deleteMany({});
    
    console.log('Clearing existing stretch ceiling projects...');
    await Project.deleteMany({ category: 'Stretch Ceilings' });
    
    console.log('Migrating stretch ceiling services...');
    const stretchCeilingData = stretchCeilingServices.map(service => ({
      titleEn: service.titleEn,
      titleAr: service.titleAr,
      descriptionEn: service.descriptionEn,
      descriptionAr: service.descriptionAr,
      image: service.image,
      detailImages: service.detailImages || [],
      featured: service.featured,
      createdAt: service.createdAt
    }));
    
    const insertedStretchCeilings = await StretchCeiling.insertMany(stretchCeilingData);
    console.log(`Inserted ${insertedStretchCeilings.length} stretch ceilings`);
    
    console.log('Adding stretch ceilings as projects...');
    const projectsData = stretchCeilingData.map(ceiling => ({
      ...ceiling,
      category: 'Stretch Ceilings'
    }));
    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`Inserted ${insertedProjects.length} stretch ceiling projects`);
    
    console.log('\nMigration completed successfully!');
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateStretchCeilings();
