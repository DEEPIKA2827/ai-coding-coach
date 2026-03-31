const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Problem title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Problem description is required'],
      minlength: [20, 'Description must be at least 20 characters'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: [true, 'Difficulty level is required'],
    },
    topic: {
      type: String,
      enum: ['Array', 'String', 'Hash Map', 'Tree', 'Graph', 'Dynamic Programming', 'Other'],
      required: [true, 'Topic is required'],
    },
    timeLimit: {
      type: Number,  // in minutes
      default: 30,
      min: [1, 'Time limit must be at least 1 minute'],
      max: [120, 'Time limit cannot exceed 120 minutes'],
    },
    examples: [
      {
        input: String,
        output: String,
      },
    ],
    constraints: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,  // Admin who created it
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Problem', problemSchema);