const mongoose = require('mongoose');

// Tracks which hint tier a user has unlocked for a specific problem
const hintSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    problemName: {
      type: String,
      required: true,
      trim: true,
    },
    currentTier: {
      type: Number,
      default: 0,    // 0 = no hints yet, 1 = first hint, 2 = second, 3 = full hint
      min: 0,
      max: 3,
    },
    reasoningAnswers: [
      {
        question: String,   // the reasoning question asked by Thinking Coach
        answer: String,     // user's answer
        evaluatedAt: { type: Date, default: Date.now },
      },
    ],
    hintsUnlocked: [
      {
        tier: Number,       // which tier was unlocked
        unlockedAt: { type: Date, default: Date.now },
      },
    ],
    completed: {
      type: Boolean,
      default: false,       // true when user marks the problem as solved
    },
  },
  { timestamps: true }
);

// One session per user per problem
hintSessionSchema.index({ user: 1, problemName: 1 }, { unique: true });

module.exports = mongoose.model('HintSession', hintSessionSchema);
