'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prizes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      draw_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'lottery_draws', key: 'id' }, onDelete: 'CASCADE' },
      ticket_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'lottery_tickets', key: 'id' }, onDelete: 'CASCADE' },
      amount: { type: Sequelize.DECIMAL(12,2), allowNull: false },
      claimed: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prizes');
  }
};
