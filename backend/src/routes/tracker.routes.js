// Route: /api/tracker
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ message: 'Tracker route is working' });
});

module.exports = router;
