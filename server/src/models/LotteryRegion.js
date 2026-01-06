const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LotteryRegion = sequelize.define('LotteryRegion', {
  code: {
    type: DataTypes.STRING(10),
    unique: true
  },
  name: DataTypes.STRING(100)
}, {
  tableName: 'lottery_regions',
  underscored: true,
  timestamps: true
});

LotteryRegion.associate = models => {
  LotteryRegion.hasMany(models.LotteryProvince, {
    foreignKey: 'region_id',
    as: 'provinces'
  });
};

module.exports = LotteryRegion;
