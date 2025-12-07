require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkSession() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('medibase');
    
    const sessionId = '05ae922e-ac4d-4e9c-86da-3c1b8337f8f29';
    
    // Check if session exists
    const session = await db.collection('sessionData').findOne({ sessionId });
    
    if (session) {
      console.log('✅ Session trouvée:');
      console.log('SessionId:', session.sessionId);
      console.log('UserId:', session.userId);
      console.log('DoctorName:', session.doctorName);
      console.log('SessionState:', session.sessionState);
      console.log('Files:', session.files?.length || 0, 'fichiers');
      console.log('SessionOwnerId:', session.sessionOwnerId || 'Non défini');
    } else {
      console.log('❌ Session non trouvée pour sessionId:', sessionId);
      
      // Check what sessions exist
      const allSessions = await db.collection('sessionData').find({}).toArray();
      console.log('\n📊 Sessions disponibles:');
      allSessions.forEach((s, index) => {
        console.log(`${index + 1}. ${s.sessionId} - ${s.doctorName} (${s.sessionState})`);
      });
    }
    
  } finally {
    await client.close();
  }
}

checkSession().catch(console.error);