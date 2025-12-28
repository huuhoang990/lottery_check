const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LotteryDraw = sequelize.define('LotteryDraw', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  draw_date: { type: DataTypes.DATEONLY, allowNull: false, unique: true },
  winning_number: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'lottery_draws',
  underscored: true,
  timestamps: true
});

module.exports = LotteryDraw;
