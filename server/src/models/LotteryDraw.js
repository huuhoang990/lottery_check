const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LotteryDraw = sequelize.define('LotteryDraw', {
  draw_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'lottery_draws',
  underscored: true,
  timestamps: true
});

LotteryDraw.associate = models => {
  LotteryDraw.belongsTo(models.LotteryProvince, {
    foreignKey: 'province_id'
  });

  LotteryDraw.hasMany(models.LotteryPrize, {
    foreignKey: 'draw_id',
    as: 'prizes'
  });
};

module.exports = LotteryDraw;
