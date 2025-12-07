/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");

// Import your Express app
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import your existing routes
const authRoutes = require("./src/routes/authRoutes");
const fileRoutes = require("./src/routes/fileRoutes");
const viewFilesRoutes = require("./src/routes/viewFilesRoutes");
const addNewFiles = require("./src/routes/addNewFiles");

// Import services
const initializeMongoDB = require("./src/services/initializeMongoDB");
// Note: Firebase Functions handles environment variables differently

// Create Express app
const app = express();

// CORS configuration
app.use(cors({
  origin: ["https://medibase-eslem.web.app", "https://medibase-eslem.firebaseapp.com", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));

// Initialize MongoDB connection
let dbInitialized = false;

async function initializeApp(req, res, next) {
  if (!dbInitialized) {
    try {
      console.log("🔄 Initializing MongoDB connection...");
      const db = await initializeMongoDB();
      app.locals.db = db;
      console.log("✅ MongoDB connection established for Firebase Functions");
      dbInitialized = true;
    } catch (error) {
      console.error("❌ Failed to initialize MongoDB:", error);
      return res.status(500).json({error: "Database connection failed"});
    }
  }
  next();
}

// Add middleware to ensure DB connection
app.use(initializeApp);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Medibase Backend API running on Firebase Functions",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/view-files", viewFilesRoutes);
app.use("/api", addNewFiles);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("🚨 Unhandled error:", error);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
  });
});

// Set global options
setGlobalOptions({ maxInstances: 10 });

// Export the Express app as a Firebase Function
exports.api = functions
    .region("europe-west1") // Choose your preferred region
    .runWith({
      timeoutSeconds: 540,
      memory: "2GB",
    })
    .https
    .onRequest(app);
