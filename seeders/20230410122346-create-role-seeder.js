'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'user',
          level: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'manager',
          level: 300,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'admin',
          level: 900,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', {})
  }
}
