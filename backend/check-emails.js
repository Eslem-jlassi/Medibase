require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkEmails() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('FileManagement');
    
    const userSessions = await db.collection('userSessionData').find({}).toArray();
    
    console.log('📊 Found', userSessions.length, 'user sessions:');
    
    userSessions.forEach((session, index) => {
      console.log(`\n--- Session ${index + 1} ---`);
      console.log('UserId:', session.userId);
      console.log('Emails:');
      session.emails?.forEach((emailObj, emailIndex) => {
        console.log(`  ${emailIndex + 1}. ${emailObj.email} - Status: ${emailObj.status}`);
      });
    });
    
  } finally {
    await client.close();
  }
}

checkEmails().catch(console.error);