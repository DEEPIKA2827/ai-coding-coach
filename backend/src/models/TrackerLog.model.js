const mongoose = require('mongoose');

// Tracks what a user learned each time they work on a problem
const trackerLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    problemName: {
      type: String,
      required: [true, 'Problem name is required'],
      trim: true,
    },
    problemUrl: {
      type: String, // e.g. LeetCode link
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Solved', 'Attempted', 'Revisit'],
      default: 'Attempted',
    },
    whatILearned: {
      type: String, // user writes their own reflection
      trim: true,
    },
    approach: {
      type: String, // e.g. "Used sliding window, two pointers"
      trim: true,
    },
    timeSpentMinutes: {
      type: Number, // how long they spent on this problem
      default: 0,
    },
    hintsUsed: {
      type: Number, // how many hint tiers they unlocked
      default: 0,
    },
    tags: {
      type: [String], // e.g. ['array', 'dynamic programming']
      default: [],
    },
    practicedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TrackerLog', trackerLogSchema);
