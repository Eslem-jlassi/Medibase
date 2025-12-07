// Firebase Functions environment configuration
const functions = require("firebase-functions");

// For Firebase Functions, we use either:
// 1. Firebase config (functions.config())
// 2. Process environment variables
// 3. Hardcoded values for development

const config = {
  mongodbUri: process.env.MONGODB_URI || 
              (functions.config().mongodb && functions.config().mongodb.uri) || 
              "mongodb+srv://medibase-admin:Eslem1234*@cluster0.yvzcae8.mongodb.net/medibase?retryWrites=true&w=majority&appName=Cluster0",
              
  jwtSecret: process.env.JWT_SECRET || 
             (functions.config().jwt && functions.config().jwt.secret) || 
             "907453d4e5399660d870222caf7b583e0fca42167a1a5753223a332b0a5a458ce4c6460afbb777c8d34dd1f9b49f78eb4e016ae7e155535a37d87140e7472b89",
             
  emailUser: process.env.EMAIL_USER || 
             (functions.config().email && functions.config().email.user) || 
             "eslemjlassi23@gmail.com",
             
  emailPass: process.env.EMAIL_PASS || 
             (functions.config().email && functions.config().email.pass) || 
             "uppnwcckqzifygyi",
             
  masterEncryptionKey: process.env.MASTER_ENCRYPTION_KEY || 
                       (functions.config().encryption && functions.config().encryption.key) || 
                       "a60738e541ed87ce54cafb04840b02cc3937cd36b368319a0fbc86ff5428d6d4",
                       
  appBaseUrl: process.env.APP_BASE_URL || 
              (functions.config().app && functions.config().app.baseurl) || 
              "https://medibase-eslem.web.app",
              
  nodeEnv: process.env.NODE_ENV || "production",
  
  port: process.env.PORT || 3001
};

module.exports = config;