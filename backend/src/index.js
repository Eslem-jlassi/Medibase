require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');
const addNewFilesRoutes = require("./routes/addNewFiles");
const viewFilesRoutes=require('./routes/viewFilesRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const doctorRoutes = require('./routes/doctorRoutes.js');
const cors = require("cors");

const app = express();

// Configuration CORS pour Firebase Hosting et localhost
app.use(cors({
    origin: [
        "http://localhost:3000", 
        "http://localhost:5173",
        "https://medibase-eslem.web.app", 
        "https://medibase-eslem.firebaseapp.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-session-owner"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 86400 // 24 heures
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Connect to MongoDB
let dbConnectionPromise = null;
let dbConnected = false;

if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('✅ Connected to MongoDB');
            app.locals.db = mongoose.connection.db;
            dbConnected = true;

        })
        .catch(err => {
            console.error('❌ MongoDB connection error:', err);
            dbConnected = false;
        });
}

// Middleware to ensure DB connection before processing requests (except health check)
app.use(async (req, res, next) => {
    if (req.path === '/') {
        return next();
    }
    
    if (!dbConnected && dbConnectionPromise) {
        try {
            await dbConnectionPromise;
        } catch (err) {
            return res.status(503).json({ error: 'Database connection failed' });
        }
    }
    
    if (!app.locals.db && mongoose.connection.db) {
        app.locals.db = mongoose.connection.db;
    }
    
    next();
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Medibase Backend API is running',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        dbConnected: dbConnected,
        version: '1.0.1' // Force new deployment
    });
});

// Routes
app.use('/', fileRoutes);
app.use('/', addNewFilesRoutes);
app.use('/', viewFilesRoutes);
app.use('/', authRoutes);
app.use('/', doctorRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server for local development
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;
