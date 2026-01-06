'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lottery_draws', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      province_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'lottery_provinces',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      draw_date: {
        type: Sequelize.DATEONLY,
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

    await queryInterface.addConstraint('lottery_draws', {
      fields: ['province_id', 'draw_date'],
      type: 'unique',
      name: 'unique_draw_per_province_date'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('lottery_draws');
  }
};
