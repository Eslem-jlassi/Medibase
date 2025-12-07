require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');
const addNewFilesRoutes = require("./routes/addNewFiles");
const viewFilesRoutes=require('./routes/viewFilesRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not set');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        // Expose native db instance for routes needing direct access (e.g., GridFS)
        app.locals.db = mongoose.connection.db;
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
}

async function startServer() {
    await connectDB();

    app.use('/', fileRoutes);
    app.use('/', addNewFilesRoutes);
    app.use('/', viewFilesRoutes);
    app.use('/', authRoutes);

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

startServer();
