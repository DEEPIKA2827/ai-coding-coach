// Route: /api/auth
const express = require('express');
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (require token)
router.get('/me', verifyToken, authController.getMe);

// Health check
router.get('/health', (req, res) => {
  res.json({ message: 'Auth route is working' });
});

module.exports = router;
