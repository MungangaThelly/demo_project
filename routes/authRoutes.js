const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const { body } = require('express-validator'); // For input validation

const router = express.Router();

// User login
router.post('/login', 
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters long'),
    loginUser
);

// User registration
router.post('/register',
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters long'),
    registerUser
);

module.exports = router;
