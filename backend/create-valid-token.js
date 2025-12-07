require('dotenv').config();
const jwt = require('jsonwebtoken');

// Test avec le sessionId existant
const sessionId = "d2543fde-0b97-445d-b03b-f9e9e2d14a17"; // Session "rty" Active

console.log('Current JWT_SECRET:', process.env.JWT_SECRET ? 'Set (length: ' + process.env.JWT_SECRET.length + ')' : 'Not set');

// Create a new token
const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: "24h" });
console.log('\n🔑 New valid token:');
console.log(token);

console.log('\n🔗 New valid link:');
console.log(`http://localhost:3000/view-files/${sessionId}?token=${token}`);

// Test if we can verify it
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('\n✅ Token verification successful:', decoded);
} catch (error) {
  console.log('❌ Token verification failed:', error.message);
}