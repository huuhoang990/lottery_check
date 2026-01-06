const ticketCheckerService = require('./ticket-checker.service');

exports.checkTicket = async (req, res, next) => {
  try {
    const result = await ticketCheckerService.checkTicket(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
