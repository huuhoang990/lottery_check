const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prize = sequelize.define('Prize', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  draw_id: { type: DataTypes.INTEGER, allowNull: false },
  ticket_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  claimed: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'prizes',
  underscored: true,
  timestamps: true
});

module.exports = Prize;
