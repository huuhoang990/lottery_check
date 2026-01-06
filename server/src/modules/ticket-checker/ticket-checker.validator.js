exports.validateCheckTicket = (req, res, next) => {
  const { province, draw_date, ticket_number } = req.body;

  if (!province || !draw_date || !ticket_number) {
    return res.status(400).json({
      success: false,
      message: 'province, draw_date and ticket_number are required'
    });
  }

  next();
};
