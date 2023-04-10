'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      ['維護修繕', '文具購買', '製作物申請', '其他']
        .map(item => {
          return {
            category: item,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {})
  }
}
