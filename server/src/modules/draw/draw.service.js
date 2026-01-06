const { crawlAllRegions } = require('./draw.crawler');
const {
  LotteryRegion,
  LotteryProvince,
  LotteryDraw,
  LotteryPrize,
  LotteryNumber,
  sequelize
} = require('../../models');

exports.syncAllRegionsLottery = async () => {
  const regions = await crawlAllRegions();

  console.log('Starting synchronization of all regions lottery data...');

  const stats = {
    regionsProcessed: 0,
    provincesProcessed: 0,
    drawsCreated: 0,
    prizesProcessed: 0,
    numbersInserted: 0
  };

  await sequelize.transaction(async (t) => {
    for (const [regionName, regionData] of Object.entries(regions)) {
      const { draw_date, provinces } = regionData;
      if (!draw_date || !provinces?.length) continue;

      console.log(`🔄 Region: ${regionName} - Date: ${draw_date}`);
      stats.regionsProcessed++;

      // 1️⃣ Region
      const region = await LotteryRegion.findOne({
        where: { name: regionName },
        transaction: t
      });

      if (!region) {
        console.warn(`⚠️ Region not found: ${regionName}`);
        continue;
      }

      // 2️⃣ Provinces
      for (const p of provinces) {
        const [province] = await LotteryProvince.findOrCreate({
          where: {
            name: p.name,
            region_id: region.id
          },
          defaults: {
            name: p.name,
            region_id: region.id
          },
          transaction: t
        });

        stats.provincesProcessed++;

        // 3️⃣ Draw (unique by province + date)
        const [draw, drawCreated] = await LotteryDraw.findOrCreate({
          where: {
            draw_date,
            province_id: province.id
          },
          defaults: {
            draw_date,
            province_id: province.id
          },
          transaction: t
        });

        if (drawCreated) {
          stats.drawsCreated++;
        }

        // 4️⃣ Prizes
        for (const prize of p.prizes) {
          const [prizeRow] = await LotteryPrize.findOrCreate({
            where: {
              draw_id: draw.id,
              prize_code: prize.prize_code
            },
            defaults: {
              draw_id: draw.id,
              prize_code: prize.prize_code
            },
            transaction: t
          });

          stats.prizesProcessed++;

          // Remove old numbers before inserting new ones
          await LotteryNumber.destroy({
            where: { prize_id: prizeRow.id },
            transaction: t
          });

          // Insert new numbers
          const numbersData = prize.numbers.map(num => ({
            prize_id: prizeRow.id,
            number: num
          }));

          await LotteryNumber.bulkCreate(numbersData, { transaction: t });

          stats.numbersInserted += prize.numbers.length;
        }
      }
    }
  });

  return {
    success: true,
    message: 'Lottery data synchronized successfully',
    statistics: stats,
    timestamp: new Date().toISOString()
  };
};
