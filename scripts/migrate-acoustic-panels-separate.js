const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://eslamabdullatif21_db_user:oneone2@cluster0.93xn6yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Define AcousticPanel schema
const acousticPanelSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, default: 'Acoustic Panels' },
  image: { type: String, required: true },
  detailImages: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const AcousticPanel = mongoose.models.AcousticPanel || mongoose.model('AcousticPanel', acousticPanelSchema);

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

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

const acousticPanelsData = [
  {
    titleEn: 'Fabric-Wrapped Acoustic Panels',
    titleAr: 'ألواح صوتية مبطنة بالقماش',
    descriptionEn: 'Premium fabric-wrapped acoustic panels for superior sound absorption. These panels are designed to blend seamlessly into any interior while providing excellent acoustic performance.',
    descriptionAr: 'ألواح صوتية مبطنة بالقماش عالية الجودة لامتصاص الصوت الفائق. تم تصميم هذه الألواح لتندمج بسلاسة في أي تصميم داخلي مع توفير أداء صوتي ممتاز.',
    image: '/art-images/acoustic-panels/fabric-wrapped-acoustic/AS_Fabrisorb_Fabric-Wrapped-Panels-4-1-1024x768-1.jpg',
    detailImages: [
      '/art-images/acoustic-panels/fabric-wrapped-acoustic/AS_Fabrisorb_Fabric-Wrapped-Panels-4-1-1024x768-1.jpg'
    ],
    featured: true
  },
  {
    titleEn: 'Polyester Acoustic Panels',
    titleAr: 'ألواح صوتية من البوليستر',
    descriptionEn: 'High-performance polyester acoustic panels offering excellent sound absorption and durability. Perfect for commercial and residential applications.',
    descriptionAr: 'ألواح صوتية عالية الأداء من البوليستر توفر امتصاص صوت ممتاز ومتانة عالية. مثالية للتطبيقات التجارية والسكنية.',
    image: '/art-images/acoustic-panels/polyster-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp',
    detailImages: [
      '/art-images/acoustic-panels/polyster-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp'
    ],
    featured: true
  },
  {
    titleEn: 'Wood Wool Acoustic Panels',
    titleAr: 'ألواح صوتية من الصوف الخشبي',
    descriptionEn: 'Natural wood wool acoustic panels combining excellent acoustic properties with sustainable materials. Ideal for eco-friendly sound solutions.',
    descriptionAr: 'ألواح صوتية طبيعية من الصوف الخشبي تجمع بين الخصائص الصوتية الممتازة والمواد المستدامة. مثالية للحلول الصوتية الصديقة للبيئة.',
    image: '/art-images/acoustic-panels/wood-wool/1A-studio-panel-1024x683-1.jpg',
    detailImages: [
      '/art-images/acoustic-panels/wood-wool/1A-studio-panel-1024x683-1.jpg'
    ],
    featured: true
  },
  {
    titleEn: 'Custom Acoustic Solutions',
    titleAr: 'حلول صوتية مخصصة',
    descriptionEn: 'Tailored acoustic solutions designed to meet specific requirements. From custom shapes to specialized materials, we create the perfect acoustic environment.',
    descriptionAr: 'حلول صوتية مصممة خصيصاً لتلبية المتطلبات المحددة. من الأشكال المخصصة إلى المواد المتخصصة، نخلق البيئة الصوتية المثالية.',
    image: '/art-images/acoustic-panels/fabric-wrapped-acoustic/1A-studio-panel-1024x683-1.jpg',
    detailImages: [
      '/art-images/acoustic-panels/fabric-wrapped-acoustic/1A-studio-panel-1024x683-1.jpg'
    ],
    featured: false
  },
  {
    titleEn: 'Ceiling Acoustic Panels',
    titleAr: 'ألواح صوتية للسقف',
    descriptionEn: 'Specialized ceiling-mounted acoustic panels for optimal sound control. Perfect for auditoriums, conference rooms, and open office spaces.',
    descriptionAr: 'ألواح صوتية متخصصة مثبتة على السقف للتحكم الأمثل في الصوت. مثالية للمسارح وقاعات المؤتمرات والمكاتب المفتوحة.',
    image: '/art-images/acoustic-panels/polyster-acoustic/baffle-ceiling-system.webp',
    detailImages: [
      '/art-images/acoustic-panels/polyster-acoustic/baffle-ceiling-system.webp'
    ],
    featured: false
  },
  {
    titleEn: 'Wall Acoustic Treatment',
    titleAr: 'معالجة صوتية للجدران',
    descriptionEn: 'Comprehensive wall acoustic treatment solutions. Transform any space with professional-grade acoustic panels designed for maximum effectiveness.',
    descriptionAr: 'حلول شاملة للمعالجة الصوتية للجدران. حول أي مساحة بألواح صوتية عالية الجودة مصممة للفعالية القصوى.',
    image: '/art-images/acoustic-panels/polyster-acoustic/baffles-in-ceiling.webp',
    detailImages: [
      '/art-images/acoustic-panels/polyster-acoustic/baffles-in-ceiling.webp'
    ],
    featured: false
  },
  {
    titleEn: 'Studio Acoustic Panels',
    titleAr: 'ألواح صوتية للاستوديو',
    descriptionEn: 'Professional studio-grade acoustic panels for recording studios, home theaters, and music production spaces. Achieve perfect sound quality.',
    descriptionAr: 'ألواح صوتية احترافية لاستوديوهات التسجيل ودور السينما المنزلية ومساحات إنتاج الموسيقى. احصل على جودة صوت مثالية.',
    image: '/art-images/acoustic-panels/wood-wool/3.Site-Photo-1024x580-1.jpg',
    detailImages: [
      '/art-images/acoustic-panels/wood-wool/3.Site-Photo-1024x580-1.jpg'
    ],
    featured: false
  }
];

async function migrateAcousticPanels() {
  try {
    await connectDB();
    
    console.log('Clearing existing acoustic panels...');
    await AcousticPanel.deleteMany({});
    
    console.log('Clearing existing acoustic panel projects...');
    await Project.deleteMany({ category: 'Acoustic Panels' });
    
    console.log('Inserting acoustic panels...');
    const insertedPanels = await AcousticPanel.insertMany(acousticPanelsData);
    console.log(`Inserted ${insertedPanels.length} acoustic panels`);
    
    console.log('Inserting acoustic panels as projects...');
    const projectsData = acousticPanelsData.map(panel => ({
      ...panel,
      category: 'Acoustic Panels'
    }));
    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`Inserted ${insertedProjects.length} acoustic panel projects`);
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateAcousticPanels();
