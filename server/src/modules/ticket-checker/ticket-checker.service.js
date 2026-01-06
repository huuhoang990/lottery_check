const {
  LotteryProvince,
  LotteryDraw,
  LotteryPrize,
  LotteryNumber
} = require('../../models');

/**
 * Check lottery ticket against database results
 */
exports.checkTicket = async ({ province_name, draw_date, ticket_number }) => {
  const ticket = String(ticket_number).trim();

  // 1️⃣ Find province + draw + prizes + numbers
  const provinceRow = await LotteryProvince.findOne({
    where: { name: province_name },
    include: [
      {
        model: LotteryDraw,
        where: { draw_date },
        include: [
          {
            model: LotteryPrize,
            as: 'prizes',
            include: [
              {
                model: LotteryNumber,
                as: 'numbers' // Added alias to match association
              }
            ]
          }
        ]
      }
    ]
  });

  console.log(provinceRow);

  if (!provinceRow) {
    return {
      success: false,
      message: 'Province or draw date not found'
    };
  }

  const draw = provinceRow.LotteryDraws?.[0];
  if (!draw) {
    return {
      success: false,
      message: 'No draw found for this date'
    };
  }

  // 2️⃣ Compare ticket with winning numbers (right-to-left)
  const matches = [];

  for (const prize of draw.prizes) {
    for (const num of prize.numbers) {
      if (ticket.endsWith(num.number)) {
        matches.push({
          prize_code: prize.prize_code,
          winning_number: num.number,
          matched_digits: num.number.length
        });
      }
    }
  }

  // 3️⃣ Highest prize first
  matches.sort((a, b) => b.matched_digits - a.matched_digits);

  if (!matches.length) {
    return {
      success: true,
      message: 'Not a winning ticket',
      result: null
    };
  }

  return {
    success: true,
    message: 'Winning ticket',
    result: matches[0],
    all_matches: matches
  };
};
