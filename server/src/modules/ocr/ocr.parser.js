function parseLotteryTicket(text) {
  const ticketNumberMatch = text.match(/\b\d{6}\b/);
  const dateMatch = text.match(/\b\d{2}-\d{2}-\d{4}\b/);

  const station = text.includes("TP.HCM") ? "TP.HCM" : null;

  const isSpecialPrize = text.includes("GIẢI ĐẶC BIỆT");

  let prizeAmount = null;
  if (text.toLowerCase().includes("2ty")) {
    prizeAmount = 2_000_000_000;
  }

  let denomination = null;
  if (text.includes("10.000")) {
    denomination = 10000;
  }

  return {
    ticket: {
      number: ticketNumberMatch ? ticketNumberMatch[0] : null,
      drawDate: dateMatch
        ? dateMatch[0].split("-").reverse().join("-")
        : null,
      station,
      denomination
    },
    prize: isSpecialPrize
      ? {
          type: "SPECIAL",
          label: "GIẢI ĐẶC BIỆT",
          amount: prizeAmount
        }
      : null,
    rawText: text
  };
}

module.exports = {
  parseLotteryTicket
};
