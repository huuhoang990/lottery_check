const express = require('express');
const router = express.Router();
const controller = require('./ticket-checker.controller');

/**
 * POST /api/ticket-checker/check
 */
router.post(
  '/check',
  validateCheckTicket,
  controller.checkTicket
);


module.exports = router;
