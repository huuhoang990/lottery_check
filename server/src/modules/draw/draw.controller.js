// draw.controller.js
const { syncAllRegionsLottery } = require('./draw.service');

exports.syncAllRegionsLotteryHandler = async (req, res) => {
  try {
    const result = await syncAllRegionsLottery();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
