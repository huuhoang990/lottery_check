'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_providers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      provider: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      provider_user_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addConstraint('user_providers', {
      fields: ['provider', 'provider_user_id'],
      type: 'unique',
      name: 'unique_provider_user'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_providers');
  }
};
