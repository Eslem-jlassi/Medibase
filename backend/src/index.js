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

app.use(cors({
    origin: ["http://localhost:3000", "https://medibase-eslem.web.app", "https://medibase-eslem.firebaseapp.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-session-owner"]
}));
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
            return mongoose.connection.db;
        })
        .catch(err => {
            console.error('❌ MongoDB connection error:', err);
            dbConnected = false;
            throw err;
        });
}

// Middleware to ensure DB connection before processing requests (except health check)
app.use(async (req, res, next) => {
    if (req.path === '/') {
        return next();
    }
    
    try {
        // Wait for DB connection if not yet connected
        if (!dbConnected && dbConnectionPromise) {
            await dbConnectionPromise;
            dbConnected = true;
        }
        
        // Ensure app.locals.db is set
        if (!app.locals.db) {
            if (mongoose.connection.db) {
                app.locals.db = mongoose.connection.db;
            } else {
                console.error('❌ Database not available');
                return res.status(503).json({ error: 'Database not initialized' });
            }
        }
        
        next();
    } catch (err) {
        console.error('❌ Database middleware error:', err);
        return res.status(503).json({ error: 'Database connection failed' });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Medibase Backend API is running',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        dbConnected: dbConnected,
        version: '1.0.2' // Fix database initialization and forgot password
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
