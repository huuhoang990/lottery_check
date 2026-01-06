const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LotteryPrize = sequelize.define('LotteryPrize', {
  prize_code: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  prize_order: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'lottery_prizes',
  underscored: true,
  timestamps: true
});

LotteryPrize.associate = models => {
  LotteryPrize.belongsTo(models.LotteryDraw, {
    foreignKey: 'draw_id'
  });

  LotteryPrize.hasMany(models.LotteryNumber, {
    foreignKey: 'prize_id',
    as: 'numbers'
  });
};

module.exports = LotteryPrize;
