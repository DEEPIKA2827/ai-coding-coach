require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Route imports
const authRoutes     = require('./src/routes/auth.routes');
const hintsRoutes    = require('./src/routes/hints.routes');
const problemRoutes  = require('./src/routes/problems.routes');
const analyzerRoutes = require('./src/routes/analyzer.routes');
const trackerRoutes  = require('./src/routes/tracker.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'AI Coding Coach API is running 🚀' });
});

// Routes
app.use('/api/auth',     authRoutes);
app.use('/api/hints',    hintsRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/analyzer', analyzerRoutes);
app.use('/api/tracker',  trackerRoutes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
