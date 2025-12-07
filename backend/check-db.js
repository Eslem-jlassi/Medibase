require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    
    console.log('\n📊 Available databases:');
    dbs.databases.forEach(db => {
      console.log(`  - ${db.name}`);
    });
    
    // Check FileManagement database
    const db = client.db('FileManagement');
    const collections = await db.listCollections().toArray();
    
    console.log('\n📁 Collections in FileManagement database:');
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    // Check userSessionData specifically
    if (collections.some(c => c.name === 'userSessionData')) {
      const count = await db.collection('userSessionData').countDocuments();
      console.log(`\n📊 userSessionData collection has ${count} documents`);
      
      if (count > 0) {
        const sample = await db.collection('userSessionData').findOne();
        console.log('\n📄 Sample document:');
        console.log(JSON.stringify(sample, null, 2));
      }
    }
    
    // Check if there might be data in another database
    for (const database of dbs.databases) {
      if (database.name !== 'FileManagement' && !['admin', 'local', 'config'].includes(database.name)) {
        const testDb = client.db(database.name);
        const testCollections = await testDb.listCollections().toArray();
        
        if (testCollections.some(c => c.name === 'userSessionData')) {
          const count = await testDb.collection('userSessionData').countDocuments();
          console.log(`\n🔍 Found userSessionData in ${database.name} with ${count} documents`);
        }
      }
    }
    
  } finally {
    await client.close();
  }
}

checkDatabase().catch(console.error);