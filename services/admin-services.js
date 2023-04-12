// const { Op } = require('sequelize')
const { User, Role, Category } = require('../models')
// const { validationResult } = require('express-validator')

const adminService = {
  getUsers: (req, cb) => {
    return User.findAll({
      raw: true,
      nest: true,
      attributes: [
        'id', 'name', 'email', 'roleId', 'categoryId'
      ],
      include: [
        { model: Role },
        { model: Category }
      ],
      order: [
        ['name', 'ASC']
      ]
    })
      .then(users => cb(null, users))
      .catch(err => cb(err))
  }
}

module.exports = adminService
