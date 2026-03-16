// Route: /api/problems
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ message: 'Problems route is working' });
});

module.exports = router;
