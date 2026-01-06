const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const LotteryProvince = sequelize.define('LotteryProvince', {
  code: {
    type: DataTypes.STRING(10),
    allowNull: true,
    unique: true
  },
  name: DataTypes.STRING(100)
}, {
  tableName: 'lottery_provinces',
  underscored: true,
  timestamps: true
});

LotteryProvince.associate = models => {
  LotteryProvince.belongsTo(models.LotteryRegion, {
    foreignKey: 'region_id'
  });
};

module.exports = LotteryProvince;
