const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LotteryNumber = sequelize.define('LotteryNumber', {
  number: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  tableName: 'lottery_numbers',
  underscored: true,
  timestamps: false
});

LotteryNumber.associate = models => {
  LotteryNumber.belongsTo(models.LotteryPrize, {
    foreignKey: 'prize_id'
  });
};

module.exports = LotteryNumber;
