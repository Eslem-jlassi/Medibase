require('dotenv').config();
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

async function createFreshSession() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('medibase');
    
    // Create a new session
    const newSessionId = uuidv4();
    const userId = '691df9c44b1bf242c5eca5cf'; // Use existing userId
    const doctorName = 'Dr Test';
    
    // Get some files from the user
    const userFiles = await db.collection('encryptedFiles.files')
      .find({ "metadata.userId": userId })
      .limit(1)
      .toArray();
    
    const fileIds = userFiles.map(file => file._id.toString());
    
    // Create new session
    const newSession = {
      sessionId: newSessionId,
      userId: userId,
      doctorName: doctorName,
      sessionState: 'Active',
      files: fileIds,
      createdAt: new Date()
    };
    
    await db.collection('sessionData').insertOne(newSession);
    
    // Create JWT token
    const token = jwt.sign({ sessionId: newSessionId }, process.env.JWT_SECRET, { expiresIn: "24h" });
    
    console.log('✅ Nouvelle session créée:');
    console.log('SessionId:', newSessionId);
    console.log('UserId:', userId);
    console.log('DoctorName:', doctorName);
    console.log('Files:', fileIds.length);
    
    console.log('\n🔗 Nouveau lien valide:');
    console.log(`http://localhost:3000/view-files/${newSessionId}?token=${token}`);
    
  } finally {
    await client.close();
  }
}

createFreshSession().catch(console.error);