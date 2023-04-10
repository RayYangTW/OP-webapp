'use strict'
const faker = require('faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const statusOptions = ['done', 'inProgress', 'notStarted']
    await queryInterface.bulkInsert('Applies',
      Array.from({ length: 30 }, () => ({
        image1: faker.image.image(),
        image2: faker.image.image(),
        image3: faker.image.image(),
        description: faker.lorem.sentence().substring(0, 100),
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        progress: faker.lorem.word(),
        category_id: categories[Math.floor(Math.random() * categories.length)].id,
        created_at: faker.date.recent(30),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Applies', {})
  }
}
