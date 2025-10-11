const fetch = require('node-fetch');

async function testFeaturedAPI() {
  try {
    const response = await fetch('http://localhost:3003/api/featured');
    const data = await response.json();
    
    console.log('Featured API Response:');
    console.log('Stretch Ceilings count:', data.stretchCeilings?.length || 0);
    
    if (data.stretchCeilings) {
      console.log('\nStretch Ceilings in API response:');
      data.stretchCeilings.forEach(sc => {
        console.log('-', sc.titleEn, 'featured:', sc.featured);
      });
    }
    
    // Check if Printed Stretch Ceilings is in the response
    const printedItem = data.stretchCeilings?.find(sc => sc.titleEn === 'Printed Stretch Ceilings');
    console.log('\nPrinted Stretch Ceilings in API:', printedItem ? 'YES' : 'NO');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testFeaturedAPI();

