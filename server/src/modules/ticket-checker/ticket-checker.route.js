const express = require('express');
const router = express.Router();
const controller = require('./ticket-checker.controller');
const { validateCheckTicket } = require('./ticket-checker.validator');

/**
 * POST /api/ticket-checker/check
 */
router.post(
  '/check',
  validateCheckTicket,
  controller.checkTicket
);


module.exports = router;
