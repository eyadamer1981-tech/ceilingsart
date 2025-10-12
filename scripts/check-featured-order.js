require('dotenv').config();
const mongoose = require('mongoose');

async function checkFeaturedOrder() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const Coll = mongoose.connection.collection('stretchceilings');
    
    // Get all featured stretch ceilings ordered by creation date (default sort)
    const featuredStretchCeilings = await Coll.find({ featured: true }).sort({ createdAt: -1 }).toArray();
    console.log('Featured stretch ceilings ordered by creation date (newest first):');
    featuredStretchCeilings.forEach((sc, index) => {
      console.log(`${index + 1}.`, sc.titleEn, 'featured:', sc.featured, 'createdAt:', sc.createdAt);
    });
    
    // Check what the API would return (limit 3)
    const apiResults = featuredStretchCeilings.slice(0, 3);
    console.log('\nWhat the API returns (first 3):');
    apiResults.forEach((sc, index) => {
      console.log(`${index + 1}.`, sc.titleEn);
    });
    
    // Check if Printed Stretch Ceilings is in the first 3
    const printedInFirst3 = apiResults.some(sc => sc.titleEn === 'Printed Stretch Ceilings');
    console.log('\nIs Printed Stretch Ceilings in first 3?', printedInFirst3 ? 'YES' : 'NO');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkFeaturedOrder();











