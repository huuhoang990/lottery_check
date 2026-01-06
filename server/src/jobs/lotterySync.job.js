const cron = require('node-cron');
const { syncAllRegionsLottery } = require('../modules/draw/draw.service');

/**
 * Run lottery sync every day at 16:05 (Vietnam time)
 * Cron format: minute hour day month weekday
 */
cron.schedule('5 16 * * *', async () => {
  console.log('⏰ [CRON] Starting lottery auto sync...');

  try {
    const result = await syncAllRegionsLottery();
    console.log('✅ [CRON] Sync completed:', result.statistics);
  } catch (error) {
    console.error('❌ [CRON] Sync failed:', error);
  }
}, {
  timezone: 'Asia/Ho_Chi_Minh'
});
