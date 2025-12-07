require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkMedibaseData() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('medibase'); // Correct database name
    
    const userSessions = await db.collection('userSessionData').find({}).toArray();
    
    console.log('📊 Found', userSessions.length, 'user sessions in medibase database:');
    
    userSessions.forEach((session, index) => {
      console.log(`\n--- Session ${index + 1} ---`);
      console.log('UserId:', session.userId);
      console.log('Emails:');
      session.emails?.forEach((emailObj, emailIndex) => {
        console.log(`  ${emailIndex + 1}. ${emailObj.email} - Status: ${emailObj.status}`);
      });
    });
    
    // Check specifically for eslemjlassi23@gmail.com
    const sessionWithEmail = await db.collection('userSessionData').findOne({
      "emails.email": "eslemjlassi23@gmail.com"
    });
    
    if (sessionWithEmail) {
      console.log('\n🎯 Found session with eslemjlassi23@gmail.com:');
      console.log('UserId:', sessionWithEmail.userId);
      const targetEmail = sessionWithEmail.emails.find(e => e.email === "eslemjlassi23@gmail.com");
      console.log('Email status:', targetEmail?.status);
    }
    
  } finally {
    await client.close();
  }
}

checkMedibaseData().catch(console.error);