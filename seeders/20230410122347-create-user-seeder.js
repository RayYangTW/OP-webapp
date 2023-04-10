'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DEFAULT_NUMBER = 5
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'root',
          email: 'root@example.com',
          role: 'admin',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10)),
          created_at: new Date(),
          updated_at: new Date()
        },
        ...Array.from({ length: DEFAULT_NUMBER }).map((_, i) => ({
          email: `user${i + 1}@example.com`,
          name: `user${i + 1}`,
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10)),
          role: 'user',
          created_at: new Date(),
          updated_at: new Date()
        })
        )],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
