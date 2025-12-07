const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a test token
const email = "eslemjlassi23@gmail.com";
const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });
const verificationLink = `http://localhost:3001/verify-email?token=${token}`;

console.log('Test verification link:');
console.log(verificationLink);

// Test if we can decode it
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('\nDecoded token:', decoded);
} catch (error) {
  console.log('Token verification failed:', error.message);
}