const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LotteryTicket = sequelize.define('LotteryTicket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  ticket_number: { type: DataTypes.STRING, allowNull: false },
  draw_date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
}, {
  tableName: 'lottery_tickets',
  underscored: true,
  timestamps: true
});

module.exports = LotteryTicket;
