const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
// NOTE: We use the TEST database. Set MONGODB_URI to mongodb://localhost:27017/test when running.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/art');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.model('Service', serviceSchema);

// Exact coffee shop menu data as provided
const coffeeMenu = [
  // Hot Coffee
  {
    category: 'القهوة الساخنة',
    items: [
      { name: 'اسبرسو', price: '12 ريال', nameEn: 'Espresso' },
      { name: 'مكاتو', price: '14 ريال', nameEn: 'Macchiato' },
      { name: 'امريكانو', price: '14 ريال', nameEn: 'Americano' },
      { name: 'كورتادو', price: '15 ريال', nameEn: 'Cortado' },
      { name: 'فلات وايت', price: '16 ريال', nameEn: 'Flat White' },
      { name: 'لاتيه', price: '17 ريال', nameEn: 'Latte' },
      { name: 'كابتشينو', price: '17 ريال', nameEn: 'Cappuccino' },
      { name: 'سبنش لاتيه', price: '19 ريال', nameEn: 'Spanish Latte' },
      { name: 'وايت موكا حار', price: '19 ريال', nameEn: 'White Mocha Hot' },
      { name: 'موكا حار', price: '19 ريال', nameEn: 'Mocha Hot' }
    ]
  },
  // Cold Drinks
  {
    category: 'المشروبات الباردة',
    items: [
      { name: 'ايس امريكانو', price: '18 ريال', nameEn: 'Iced Americano' },
      { name: 'ايس لاتيه', price: '18 ريال', nameEn: 'Iced Latte' },
      { name: 'ايس سبنش لاتيه', price: '20 ريال', nameEn: 'Iced Spanish Latte' },
      { name: 'أيس وايت موكا', price: '20 ريال', nameEn: 'Iced White Mocha' },
      { name: 'أيس موكا', price: '20 ريال', nameEn: 'Iced Mocha' },
      { name: 'أيس كركديه', price: '19 ريال', nameEn: 'Iced Hibiscus' }
    ]
  },
  // Fresh Juices
  {
    category: 'عصائر طازجة',
    items: [
      { name: 'برتقال', price: '19 ريال', nameEn: 'Orange Juice' },
      { name: 'منجا سادة', price: '19 ريال', nameEn: 'Mango Juice' },
      { name: 'منجا حليب', price: '19 ريال', nameEn: 'Mango Milk' },
      { name: 'ليمون سادة', price: '16 ريال', nameEn: 'Lemon Juice' },
      { name: 'ليمون نعناع', price: '19 ريال', nameEn: 'Lemon Mint' },
      { name: 'افكادو حليب', price: '19 ريال', nameEn: 'Avocado Milk' }
    ]
  },
  // Energy Drinks
  {
    category: 'مشروبات طاقة',
    items: [
      { name: 'ردبول', price: '20 ريال', nameEn: 'Red Bull' },
      { name: 'كودرد', price: '18 ريال', nameEn: 'Code Red' },
      { name: 'ريتا', price: '15 ريال', nameEn: 'Rita' }
    ]
  },
  // Mojito Drinks
  {
    category: 'مشروبات المهيتو',
    items: [
      { name: 'مهيتو ردبول', price: '25 ريال', nameEn: 'Red Bull Mojito' },
      { name: 'مهيتو كودرد', price: '22 ريال', nameEn: 'Code Red Mojito' },
      { name: 'مهيتو ريتا', price: '20 ريال', nameEn: 'Rita Mojito' },
      { name: 'مهيتو سفن', price: '18 ريال', nameEn: 'Seven Mojito' }
    ]
  },
  // Soft Drinks
  {
    category: 'المشروبات الغازية',
    items: [
      { name: 'سفن', price: '7 ريال', nameEn: 'Seven Up' },
      { name: 'حمضيات', price: '7 ريال', nameEn: 'Citrus' },
      { name: 'ببسي', price: '7 ريال', nameEn: 'Pepsi' },
      { name: 'موسي فرولة', price: '19 ريال', nameEn: 'Strawberry Smoothie' },
      { name: 'موسي شعير', price: '19 ريال', nameEn: 'Barley Smoothie' },
      { name: 'موسي رمان', price: '19 ريال', nameEn: 'Pomegranate Smoothie' }
    ]
  },
  // Drip Coffee
  {
    category: 'القهوة المقطرة',
    items: [
      { name: 'في60', price: '18 ريال', nameEn: 'V60' },
      { name: 'ايس دريب', price: '18 ريال', nameEn: 'Iced Drip' }
    ]
  },
  // Tea Section
  {
    category: 'قسم شاي',
    items: [
      { name: 'شاي اثاي براد كبير', price: '25 ريال', nameEn: 'Thai Tea Large' },
      { name: 'شاي اثاي براد وسط', price: '18 ريال', nameEn: 'Thai Tea Medium' },
      { name: 'شاي اثاي براد صغير', price: '14 ريال', nameEn: 'Thai Tea Small' },
      { name: 'شاي طائفي براد كبير', price: '25 ريال', nameEn: 'Taiwanese Tea Large' },
      { name: 'شاي طائفي براد وسط', price: '18 ريال', nameEn: 'Taiwanese Tea Medium' },
      { name: 'شاي طائفي براد صغير', price: '14 ريال', nameEn: 'Taiwanese Tea Small' },
      { name: 'شاي أحمر براد كبير', price: '25 ريال', nameEn: 'Red Tea Large' },
      { name: 'شاي احمر براد وسط', price: '18 ريال', nameEn: 'Red Tea Medium' },
      { name: 'شاي احمر براد صغير', price: '14 ريال', nameEn: 'Red Tea Small' }
    ]
  },
  // Coffee of the Day
  {
    category: 'قهوة اليوم',
    items: [
      { name: 'قهوة اليوم حار', price: '12 ريال', nameEn: 'Coffee of the Day Hot' },
      { name: 'قهوة اليوم بارد', price: '12 ريال', nameEn: 'Coffee of the Day Cold' }
    ]
  }
];

// Default placeholder image
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjM4MCIgaGVpZ2h0PSIyODAiIHJ4PSIxMCIgZmlsbD0iI0Y4RjBGMSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjUwIiBmaWxsPSIjOEI0NTEzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkNvZmZlZSBNZW51PC90ZXh0Pgo8L3N2Zz4K';

async function replaceCoffeeMenu() {
  try {
    await connectDB();
    
    console.log('Deleting ALL existing services...');
    const deleteResult = await Service.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing services`);
    
    console.log('Adding new coffee menu items...');
    
    let totalAdded = 0;
    for (const category of coffeeMenu) {
      console.log(`\nAdding category: ${category.category}`);
      for (const item of category.items) {
        const service = new Service({
          title: item.name,
          descriptionEn: `${item.nameEn} - ${item.price}`,
          descriptionAr: `${item.name} - ${item.price}`,
          category: category.category,
          image: placeholderImage,
          featured: false
        });
        
        await service.save();
        console.log(`  ✓ Added: ${item.name} (${item.price})`);
        totalAdded++;
      }
    }
    
    console.log(`\n✅ Coffee menu replacement completed successfully!`);
    console.log(`📊 Total items added: ${totalAdded}`);
    console.log(`📂 Categories: ${coffeeMenu.length}`);
    
  } catch (error) {
    console.error('❌ Error replacing coffee menu:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
replaceCoffeeMenu();

