require('dotenv').config();
const mongoose = require('mongoose');

async function checkFeaturedStretch() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const Coll = mongoose.connection.collection('stretchceilings');
    
    const featuredStretchCeilings = await Coll.find({ featured: true }).toArray();
    console.log('Featured stretch ceilings:', featuredStretchCeilings.length);
    featuredStretchCeilings.forEach(sc => {
      console.log('-', sc.titleEn, 'featured:', sc.featured);
    });
    
    const allStretchCeilings = await Coll.find({}).toArray();
    console.log('\nTotal stretch ceilings:', allStretchCeilings.length);
    allStretchCeilings.forEach(sc => {
      console.log('-', sc.titleEn, 'featured:', sc.featured);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkFeaturedStretch();
