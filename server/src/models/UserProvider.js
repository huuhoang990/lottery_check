const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProvider = sequelize.define('UserProvider', {
  provider: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  provider_user_id: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'user_providers',
  underscored: true,
  timestamps: false
});

UserProvider.associate = models => {
  UserProvider.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
};

module.exports = UserProvider;
