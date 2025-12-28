'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lottery_draws', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      draw_date: { type: Sequelize.DATEONLY, allowNull: false, unique: true },
      winning_number: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lottery_draws');
  }
};
