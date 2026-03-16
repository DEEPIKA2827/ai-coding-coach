// Route: /api/hints
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ message: 'Hints route is working' });
});

module.exports = router;
