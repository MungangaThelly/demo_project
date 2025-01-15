const express = require('express');
const cookieParser = require('cookie-parser');
const { verifyToken, verifyAdmin } = require('./routes/authMiddleware');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(cookieParser());

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
