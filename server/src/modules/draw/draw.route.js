const express = require('express');
const router = express.Router();
const controller = require('./draw.controller');

// POST /api/draw/sync-all-regions
router.post('/sync-all-regions', controller.syncAllRegionsLotteryHandler);

module.exports = router;
