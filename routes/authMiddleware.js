const jwt = require('jsonwebtoken');

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1]; // Look for token in cookie or Authorization header
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user; // Attach user info to request
        next();
    });
};

// Middleware to verify if the user has admin role
exports.verifyAdmin = (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });

        if (user.role === 'admin') {
            req.user = user;
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Admin role required' });
        }
    });
};
