'use strict';

/** @type {import('sequelize-cli').Migration} */

const REGIONS = ['Miền Nam', 'Miền Trung', 'Miền Bắc'];

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert regions
    await queryInterface.bulkInsert('lottery_regions', [
      {
        code: 'MN',
        name: 'Miền Nam',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'MB',
        name: 'Miền Bắc',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'MT',
        name: 'Miền Trung',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lottery_regions', null, {});
  }
};
