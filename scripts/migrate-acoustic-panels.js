const mongoose = require('mongoose');

// Connect to MongoDB
// NOTE: We use the TEST database. Set MONGODB_URI to mongodb://localhost:27017/test when running.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/art-website');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Service Schema
const serviceSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  detailImages: [{ type: String }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

// Static acoustic panel data to migrate
const acousticPanelData = [
  // Product Categories
  {
    titleEn: 'Fabric-Wrapped Acoustic Panels',
    titleAr: 'ألواح صوتية مبطنة بالقماش',
    descriptionEn: 'Premium fabric-wrapped acoustic panels for superior sound absorption. These panels combine excellent acoustic performance with elegant design, making them perfect for modern office spaces, conference rooms, and residential areas.',
    descriptionAr: 'ألواح صوتية مبطنة بالقماش عالية الجودة لامتصاص الصوت المتفوق. تجمع هذه الألواح بين الأداء الصوتي الممتاز والتصميم الأنيق، مما يجعلها مثالية للمساحات المكتبية الحديثة وقاعات الاجتماعات والمناطق السكنية.',
    category: 'Acoustic Panels',
    image: '/art-images/acoustic-panels/fabric-wrapped-acoustic/AS_Fabrisorb_Fabric-Wrapped-Panels-4-1-1024x768-1.jpg',
    detailImages: [
      '/art-images/acoustic-panels/fabric-wrapped-acoustic/AS_Fabrisorb_Fabric-Wrapped-Panels-4-1-1024x768-1.jpg'
    ],
    featured: true
  },
  {
    titleEn: 'Polyester Acoustic Panels',
    titleAr: 'ألواح صوتية من البوليستر',
    descriptionEn: 'High-performance polyester acoustic panels for modern spaces. These lightweight panels offer excellent sound absorption while maintaining a clean, contemporary aesthetic that complements any interior design.',
    descriptionAr: 'ألواح صوتية عالية الأداء من البوليستر للمساحات الحديثة. توفر هذه الألواح الخفيفة امتصاصاً صوتياً ممتازاً مع الحفاظ على جمالية معاصرة نظيفة تكمل أي تصميم داخلي.',
    category: 'Acoustic Panels',
    image: '/art-images/acoustic-panels/polyester-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp',
    detailImages: [
      '/art-images/acoustic-panels/polyester-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp'
    ],
    featured: true
  },
  {
    titleEn: 'Wood Wool Acoustic Panels',
    titleAr: 'ألواح صوتية من الصوف الخشبي',
    descriptionEn: 'Natural wood wool panels combining aesthetics with functionality. These eco-friendly panels provide excellent acoustic performance while adding a warm, natural element to your space.',
    descriptionAr: 'ألواح الصوف الخشبي الطبيعية التي تجمع بين الجمال والوظائف. توفر هذه الألواح الصديقة للبيئة أداءً صوتياً ممتازاً مع إضافة عنصر طبيعي دافئ لمساحتك.',
    category: 'Acoustic Panels',
    image: '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Baffles_office_7666_small-1024x683.jpg',
    detailImages: [
      '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Baffles_office_7666_small-1024x683.jpg'
    ],
    featured: true
  },
  // Showcase Items
  {
    titleEn: 'Geometric Acoustic Panels',
    titleAr: 'ألواح صوتية هندسية',
    descriptionEn: 'Innovative geometric acoustic panels that combine functionality with artistic design. These panels create stunning visual patterns while providing superior sound absorption for any space.',
    descriptionAr: 'ألواح صوتية هندسية مبتكرة تجمع بين الوظائف والتصميم الفني. تخلق هذه الألواح أنماطاً بصرية مذهلة مع توفير امتصاص صوتي متفوق لأي مساحة.',
    category: 'Acoustic Panels',
    image: '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Shapes_Diamond_office_10-1024x683.jpg',
    detailImages: [
      '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Shapes_Diamond_office_10-1024x683.jpg'
    ],
    featured: false
  },
  {
    titleEn: 'Office Acoustic Baffles',
    titleAr: 'حواجز صوتية للمكاتب',
    descriptionEn: 'Professional acoustic baffles designed specifically for office environments. These ceiling-mounted panels effectively reduce noise levels while maintaining a clean, professional appearance.',
    descriptionAr: 'حواجز صوتية مهنية مصممة خصيصاً لبيئات المكاتب. تقلل هذه الألواح المثبتة في السقف مستويات الضوضاء بفعالية مع الحفاظ على مظهر نظيف ومهني.',
    category: 'Acoustic Panels',
    image: '/art-images/acoustic-panels/polyester-acoustic/baffle-ceiling-system.webp',
    detailImages: [
      '/art-images/acoustic-panels/polyester-acoustic/baffle-ceiling-system.webp'
    ],
    featured: false
  },
  // Additional acoustic panel types
  {
    titleEn: 'Acoustic Panels - B.Alandalus',
    titleAr: 'ألواح صوتية - ب.الأندلس',
    descriptionEn: 'Premium acoustic panels featuring the B.Alandalus design. These panels offer exceptional sound absorption with a distinctive aesthetic that reflects traditional Arabic architectural elements.',
    descriptionAr: 'ألواح صوتية عالية الجودة تتميز بتصميم ب.الأندلس. توفر هذه الألواح امتصاصاً صوتياً استثنائياً مع جمالية مميزة تعكس عناصر العمارة العربية التقليدية.',
    category: 'Acoustic Panels',
    image: '/art-images/acoustic-panels/fabric-wrapped-acoustic/AS_Fabrisorb_Fabric-Wrapped-Panels-4-1-1024x768-1.jpg',
    detailImages: [
      '/art-images/acoustic-panels/fabric-wrapped-acoustic/AS_Fabrisorb_Fabric-Wrapped-Panels-4-1-1024x768-1.jpg'
    ],
    featured: true
  },
  {
    titleEn: 'Floor Insulation Panels',
    titleAr: 'ألواح عزل الأرضيات',
    descriptionEn: 'Specialized floor insulation panels designed to reduce impact noise and improve acoustic performance. Perfect for multi-story buildings and spaces requiring superior sound isolation.',
    descriptionAr: 'ألواح عزل أرضيات متخصصة مصممة لتقليل ضوضاء التأثير وتحسين الأداء الصوتي. مثالية للمباني متعددة الطوابق والمساحات التي تتطلب عزل صوتي متفوق.',
    category: 'Acoustic Panels',
    image: '/art-images/acoustic-panels/polyester-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp',
    detailImages: [
      '/art-images/acoustic-panels/polyester-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp'
    ],
    featured: false
  }
];

// Migration function
const migrateAcousticPanels = async () => {
  try {
    console.log('Starting acoustic panels migration...');
    
    // Clear existing acoustic panel services
    await Service.deleteMany({ category: 'Acoustic Panels' });
    console.log('Cleared existing acoustic panel services');
    
    // Insert new acoustic panel data
    const insertedServices = await Service.insertMany(acousticPanelData);
    console.log(`Successfully inserted ${insertedServices.length} acoustic panel services`);
    
    // Log inserted services
    insertedServices.forEach(service => {
      console.log(`- ${service.titleEn} (${service.titleAr})`);
    });
    
    console.log('Acoustic panels migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
};

// Run migration
const runMigration = async () => {
  await connectDB();
  await migrateAcousticPanels();
  await mongoose.connection.close();
  console.log('Migration completed and connection closed');
};

// Run if called directly
if (require.main === module) {
  runMigration();
}

module.exports = { migrateAcousticPanels, acousticPanelData };
