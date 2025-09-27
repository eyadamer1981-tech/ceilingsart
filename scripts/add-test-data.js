const mongoose = require('mongoose');

// MongoDB connection string - replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artceiling';

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

async function addTestData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Add test services
    const testServices = [
      {
        title: 'Luxury Ceiling Design',
        descriptionEn: 'Premium ceiling designs for luxury homes and commercial spaces',
        descriptionAr: 'تصاميم أسقف فاخرة للمنازل الراقية والمساحات التجارية',
        category: 'Luxury',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmOWZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkx1eHVyeSBDZWlsaW5nPC90ZXh0Pjwvc3ZnPg==',
        featured: true
      },
      {
        title: 'Decorative Patterns',
        descriptionEn: 'Beautiful decorative patterns and textures for modern interiors',
        descriptionAr: 'أنماط وزخارف جميلة للمساحات الداخلية الحديثة',
        category: 'Decorative',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRlY29yYXRpdmU8L3RleHQ+PC9zdmc+',
        featured: true
      },
      {
        title: 'Modern Architecture',
        descriptionEn: 'Contemporary ceiling solutions for modern architectural designs',
        descriptionAr: 'حلول أسقف معاصرة للتصاميم المعمارية الحديثة',
        category: 'Modern',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmOWZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vZGVybjwvdGV4dD48L3N2Zz4=',
        featured: false
      }
    ];

    await Service.insertMany(testServices);
    console.log('Added test services:', testServices.length);

    console.log('Test data added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding test data:', error);
    process.exit(1);
  }
}

addTestData();
