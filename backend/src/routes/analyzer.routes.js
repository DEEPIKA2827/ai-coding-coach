// Route: /api/analyzer
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ message: 'Analyzer route is working' });
});

module.exports = router;
