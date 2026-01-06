'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lottery_prizes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      draw_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'lottery_draws',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      prize_code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      prize_order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addConstraint('lottery_prizes', {
      fields: ['draw_id', 'prize_code'],
      type: 'unique',
      name: 'unique_prize_per_draw'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('lottery_prizes');
  }
};
