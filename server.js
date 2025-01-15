const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { verifyToken, verifyAdmin } = require('./routes/authMiddleware');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Load environment variables

const app = express();

// Enable CORS for all origins (or specify domains you want to allow)
app.use(cors());

app.use(express.json());
app.use(cookieParser());

// Databasanslutning
mongoose.connect(process.env.MONGO_CONNECTION_STRING) 
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Database connection error:', err)); 


// Route handling authentication (login, signup)
app.use('/auth', authRoutes);

// Public Route
app.get('/secure', verifyToken, (req, res) => {
    res.send('Secure data accessed');
});

// Admin Route
app.get('/admin-only', verifyAdmin, (req, res) => {
    res.send('Admin data accessed');
});

// Error handling for unhandled routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
