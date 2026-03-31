// Route: /api/problems
const express = require('express');
const {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} = require('../controllers/problems.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getAllProblems);           // Get all problems
router.get('/:id', getProblemById);        // Get one problem

// Protected routes (require authentication)
router.post('/', verifyToken, createProblem);      // Create problem (admin only)
router.put('/:id', verifyToken, updateProblem);    // Update problem
router.delete('/:id', verifyToken, deleteProblem); // Delete problem

module.exports = router;