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

// Mapping for UUID names to proper names
const uuidNameMapping = {
  '20 96cc8cef 3998 4a91 B05b 4c0cdf9b57c1': {
    titleEn: 'French Paper Stretch Ceiling',
    titleAr: 'سقف فرنسي مشدود من الورق',
    descriptionEn: 'Elegant French paper stretch ceiling with natural texture and sophisticated design',
    descriptionAr: 'سقف فرنسي مشدود أنيق من الورق مع نسيج طبيعي وتصميم راقي'
  },
  'H8674afce5d3d49e5b9b8e28e5522485co': {
    titleEn: 'Modern Stretch Ceiling Design',
    titleAr: 'تصميم سقف مشدود عصري',
    descriptionEn: 'Contemporary stretch ceiling featuring modern design elements and premium materials',
    descriptionAr: 'سقف مشدود معاصر يتميز بعناصر تصميم حديثة ومواد عالية الجودة'
  }
};

// Mapping for existing projects to have proper Arabic titles
const arabicTitleMapping = {
  '3 Site Photo': {
    titleAr: 'صورة موقع المشروع',
    descriptionAr: 'صورة توضيحية لموقع تركيب الألواح الصوتية في المشروع'
  },
  'Baffle Ceiling System': {
    titleAr: 'نظام السقف المعلق',
    descriptionAr: 'نظام متطور للسقف المعلق مع ألواح صوتية متخصصة'
  },
  'AS WoodWool CeilingPanel Office': {
    titleAr: 'لوح سقف من الصوف الخشبي للمكتب',
    descriptionAr: 'لوح سقف مصنوع من الصوف الخشبي مثالي للمكاتب والمباني التجارية'
  },
  'Baux Wood Wool Panels Ona634': {
    titleAr: 'ألواح الصوف الخشبي بوكس أونا 634',
    descriptionAr: 'ألواح صوتية من الصوف الخشبي بوكس بمواصفات أونا 634 المتقدمة'
  },
  'Star Ceiling2': {
    titleAr: 'سقف النجوم 2',
    descriptionAr: 'سقف مشدود بتصميم النجوم مع إضاءة ليفية متطورة'
  },
  'Star Ceiling3': {
    titleAr: 'سقف النجوم 3',
    descriptionAr: 'سقف مشدود بتصميم النجوم مع تأثيرات إضاءة متقدمة'
  },
  'Star Ceiling5': {
    titleAr: 'سقف النجوم 5',
    descriptionAr: 'سقف مشدود بتصميم النجوم مع تقنيات إضاءة حديثة'
  },
  'Star Ceiling7': {
    titleAr: 'سقف النجوم 7',
    descriptionAr: 'سقف مشدود بتصميم النجوم مع إضاءة ليفية متطورة'
  },
  'Star Ceiling8': {
    titleAr: 'سقف النجوم 8',
    descriptionAr: 'سقف مشدود بتصميم النجوم مع تأثيرات بصرية مذهلة'
  },
  'Starceiling6': {
    titleAr: 'سقف النجوم 6',
    descriptionAr: 'سقف مشدود بتصميم النجوم مع تقنيات إضاءة متقدمة'
  },
  'High Gloss Ceiling Installation In The Bathroom': {
    titleAr: 'تركيب سقف لامع في الحمام',
    descriptionAr: 'تركيب سقف مشدود لامع في الحمام مع مقاومة للرطوبة'
  },
  'High Gloss Ceiling Installation On The Kitchen': {
    titleAr: 'تركيب سقف لامع في المطبخ',
    descriptionAr: 'تركيب سقف مشدود لامع في المطبخ مع مقاومة للبخار'
  },
  'Luxury Condo Family Room With Multilevel Red Stretch Ceiling Deutchland': {
    titleAr: 'غرفة عائلية فاخرة بسقف مشدود أحمر متعدد المستويات',
    descriptionAr: 'غرفة عائلية فاخرة بسقف مشدود أحمر متعدد المستويات بتصميم ألماني'
  },
  'Multilevel Waved Reflective White Glossy Stretch Ceiling In Monopoly': {
    titleAr: 'سقف مشدود أبيض لامع متعدد المستويات مع موجات عاكسة',
    descriptionAr: 'سقف مشدود أبيض لامع متعدد المستويات مع موجات عاكسة في مشروع مونوبولي'
  },
  'Pool Spa1': {
    titleAr: 'سقف مشدود للمسبح والسبا 1',
    descriptionAr: 'سقف مشدود مقاوم للماء مثالي للمسابح والمنتجعات الصحية'
  },
  'Pool Spa3': {
    titleAr: 'سقف مشدود للمسبح والسبا 3',
    descriptionAr: 'سقف مشدود مقاوم للرطوبة مثالي للمسابح والمنتجعات الصحية'
  },
  'Pool Spa6': {
    titleAr: 'سقف مشدود للمسبح والسبا 6',
    descriptionAr: 'سقف مشدود مقاوم للماء والرطوبة للمسابح والمنتجعات الصحية'
  },
  'Merchandise Mart': {
    titleAr: 'سقف مشدود لمركز التجارة',
    descriptionAr: 'سقف مشدود متطور لمركز التجارة مع تصميم عصري'
  }
};

async function fixProjectNames() {
  try {
    await connectDB();
    
    console.log('Starting project name fixes...\n');
    
    // Fix UUID-named projects
    console.log('1. Fixing UUID-named projects...');
    for (const [uuidName, newData] of Object.entries(uuidNameMapping)) {
      const project = await Project.findOne({ title: uuidName });
      if (project) {
        console.log(`   Fixing: "${uuidName}"`);
        console.log(`   New English title: "${newData.titleEn}"`);
        console.log(`   New Arabic title: "${newData.titleAr}"`);
        
        await Project.updateOne(
          { _id: project._id },
          {
            $set: {
              titleEn: newData.titleEn,
              titleAr: newData.titleAr,
              descriptionEn: newData.descriptionEn,
              descriptionAr: newData.descriptionAr
            }
          }
        );
        console.log(`   ✅ Updated successfully\n`);
      } else {
        console.log(`   ⚠️  Project "${uuidName}" not found\n`);
      }
    }
    
    // Fix Arabic titles for existing projects
    console.log('2. Updating Arabic titles for existing projects...');
    for (const [englishTitle, arabicData] of Object.entries(arabicTitleMapping)) {
      const project = await Project.findOne({ title: englishTitle });
      if (project) {
        console.log(`   Updating Arabic title for: "${englishTitle}"`);
        console.log(`   New Arabic title: "${arabicData.titleAr}"`);
        
        await Project.updateOne(
          { _id: project._id },
          {
            $set: {
              titleAr: arabicData.titleAr,
              descriptionAr: arabicData.descriptionAr
            }
          }
        );
        console.log(`   ✅ Updated successfully\n`);
      } else {
        console.log(`   ⚠️  Project "${englishTitle}" not found\n`);
      }
    }
    
    // Show updated projects
    console.log('3. Showing updated projects...\n');
    const updatedProjects = await Project.find({}).limit(10);
    updatedProjects.forEach((project, index) => {
      console.log(`${index + 1}. English: "${project.titleEn || project.title}"`);
      console.log(`   Arabic: "${project.titleAr}"`);
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

fixProjectNames();
