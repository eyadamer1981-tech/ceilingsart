// Test script to verify coffee menu API endpoints
// Using built-in fetch (Node.js 18+)

async function testCoffeeMenuAPI() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('Testing Services API...');
    
    // Test services endpoint
    const servicesResponse = await fetch(`${baseUrl}/api/services`);
    const services = await servicesResponse.json();
    
    console.log(`\nTotal services loaded: ${services.length}`);
    
    // Group by category
    const categories = {};
    services.forEach(service => {
      if (!categories[service.category]) {
        categories[service.category] = [];
      }
      categories[service.category].push(service.title);
    });
    
    console.log('\nServices by category:');
    Object.keys(categories).forEach(category => {
      console.log(`\n${category}:`);
      categories[category].forEach(item => {
        console.log(`  - ${item}`);
      });
    });
    
    // Test categories endpoint
    console.log('\n\nTesting Categories API...');
    const categoriesResponse = await fetch(`${baseUrl}/api/services/categories`);
    const categoriesList = await categoriesResponse.json();
    
    console.log('\nCategories list:');
    categoriesList.forEach(category => {
      console.log(`  - ${category}`);
    });
    
  } catch (error) {
    console.error('Error testing API:', error.message);
    console.log('Make sure the development server is running (npm run dev)');
  }
}

// Run the test
testCoffeeMenuAPI();
