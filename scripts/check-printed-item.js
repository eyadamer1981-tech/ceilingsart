require('dotenv').config();
const mongoose = require('mongoose');

async function checkFeaturedAPI() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const Coll = mongoose.connection.collection('stretchceilings');
    
    // Check the specific item
    const printedItem = await Coll.findOne({ titleEn: "Printed Stretch Ceilings" });
    console.log('Printed Stretch Ceilings item:', {
      titleEn: printedItem?.titleEn,
      featured: printedItem?.featured,
      category: printedItem?.category
    });
    
    // Check all featured stretch ceilings
    const featuredStretchCeilings = await Coll.find({ featured: true }).toArray();
    console.log('\nAll featured stretch ceilings:');
    featuredStretchCeilings.forEach(sc => {
      console.log('-', sc.titleEn, 'featured:', sc.featured);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkFeaturedAPI();









