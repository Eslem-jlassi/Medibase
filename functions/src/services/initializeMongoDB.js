const { MongoClient } = require("mongodb");
const config = require("../config/firebaseConfig");

let db;

async function initializeMongoDB() {
  try {
    const client = await MongoClient.connect(config.mongodbUri);
    db = client.db("medibase");
    console.log("MongoDB connected successfully!");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Export function and DB instance
module.exports = initializeMongoDB;

