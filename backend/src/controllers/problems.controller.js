const Problem = require('../models/Problem.model');

// Helper function to check if user is admin
const isAdmin = (req, res, user) => {
  if (user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Only admins can perform this action',
    });
  }
};

// @route   POST /api/problems
// @desc    Create a new problem (admin only)
// @access  Private/Admin
exports.createProblem = async (req, res) => {
  try {
    // Step 1: Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: 'Please login first',
      });
    }

    // Step 2: Get user from database to check role
    const User = require('../models/User.model');
    const user = await User.findById(req.userId);

    // Step 3: Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can create problems',
      });
    }

    // Step 4: Extract problem data from request
    const { title, description, difficulty, topic, timeLimit, examples, constraints } = req.body;

    // Step 5: Validate required fields
    if (!title || !description || !difficulty || !topic) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, difficulty, and topic',
      });
    }

    // Step 6: Create problem
    const problem = await Problem.create({
      title,
      description,
      difficulty,
      topic,
      timeLimit,
      examples,
      constraints,
      createdBy: req.userId,  // Admin's ID
    });

    // Step 7: Send success response
    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      data: problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   GET /api/problems
// @desc    Get all problems (with optional filters)
// @access  Public
exports.getAllProblems = async (req, res) => {
  try {
    // Step 1: Get filter parameters from query
    const { difficulty, topic } = req.query;

    // Step 2: Build filter object
    let filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;

    // Step 3: Query database with filters
    const problems = await Problem.find(filter)
      .populate('createdBy', 'name email')  // Include creator info
      .sort({ createdAt: -1 });  // Newest first

    // Step 4: Send response
    res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   GET /api/problems/:id
// @desc    Get single problem by ID
// @access  Public
exports.getProblemById = async (req, res) => {
  try {
    // Step 1: Get problem ID from URL
    const { id } = req.params;

    // Step 2: Find problem in database
    const problem = await Problem.findById(id)
      .populate('createdBy', 'name email');

    // Step 3: Check if problem exists
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }

    // Step 4: Send response
    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   PUT /api/problems/:id
// @desc    Update problem (creator/admin only)
// @access  Private/Admin
exports.updateProblem = async (req, res) => {
  try {
    // Step 1: Check authentication
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: 'Please login first',
      });
    }

    // Step 2: Get problem ID
    const { id } = req.params;

    // Step 3: Find problem
    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }

    // Step 4: Check if user is creator or admin
    if (problem.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Only creator can update this problem',
      });
    }

    // Step 5: Extract fields to update
    const { title, description, difficulty, topic, timeLimit, examples, constraints } = req.body;

    // Step 6: Update problem
    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      {
        title,
        description,
        difficulty,
        topic,
        timeLimit,
        examples,
        constraints,
      },
      { new: true, runValidators: true }  // Return new data and validate
    );

    // Step 7: Send response
    res.status(200).json({
      success: true,
      message: 'Problem updated successfully',
      data: updatedProblem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   DELETE /api/problems/:id
// @desc    Delete problem (creator/admin only)
// @access  Private/Admin
exports.deleteProblem = async (req, res) => {
  try {
    // Step 1: Check authentication
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: 'Please login first',
      });
    }

    // Step 2: Get problem ID
    const { id } = req.params;

    // Step 3: Find problem
    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }

    // Step 4: Check if user is creator or admin
    if (problem.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Only creator can delete this problem',
      });
    }

    // Step 5: Delete problem
    await Problem.findByIdAndDelete(id);

    // Step 6: Send response
    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};