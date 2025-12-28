require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

// Import routes
// const lotteryRoutes = require('./modules/lottery/lottery.routes');
const ocrRoutes = require('./modules/ocr/ocr.route');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
// app.use('/api/lottery', lotteryRoutes);
app.use('/api/ocr', ocrRoutes);

module.exports = app; // ✅ export trực tiếp instance app
