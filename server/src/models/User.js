const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: DataTypes.STRING(100),
  email: {
    type: DataTypes.STRING(150),
    unique: true
  },
  avatar: DataTypes.STRING(255)
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true
});

User.associate = models => {
  User.hasMany(models.UserProvider, {
    foreignKey: 'user_id',
    as: 'providers'
  });
};

module.exports = User;
