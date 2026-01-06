require('dotenv').config();
const express = require('express');

const app = express();

/**
 * ======================
 * Global Middlewares
 * ======================
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ======================
 * Routes
 * ======================
 */
app.use('/api/ocr', require('./modules/ocr/ocr.route'));
app.use('/api/draw', require('./modules/draw/draw.route'));
app.use('/api/ticket-checker', require('./modules/ticket-checker/ ticket-checker.route'));

/**
 * ======================
 * 404 Handler
 * ======================
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

/**
 * ======================
 * Global Error Handler
 * ======================
 */
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack
    }),
    timestamp: new Date().toISOString()
  });
});

/** ======================
 * Scheduled Jobs
 * ======================
 */
// Load scheduled jobs
require('./jobs/lotterySync.job');

// Export the app for server.js or testing
module.exports = app;
