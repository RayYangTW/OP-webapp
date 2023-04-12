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
  },
  getUser: (req, cb) => {
    const userId = req.params.userId
    return Promise.all([
      Role.findAll({ raw: true }),
      Category.findAll({ raw: true }),
      User.findByPk(userId, {
        raw: true,
        nest: true,
        attributes: [
          'id', 'name', 'email', 'categoryId', 'roleId'
        ]
      })
    ])
      .then(([role, category, user]) => cb(null, { role, category, user }))
      .catch(err => cb(err))
  },
  updateUser: (req, cb) => {
    const userId = req.params.userId
    const { categoryId, roleId } = req.body
    return User.findByPk(userId, {
      attributes: [
        'id', 'name', 'email', 'categoryId', 'roleId'
      ]
    })
      .then(user => {
        return user.update({
          categoryId: categoryId === '' ? null : categoryId,
          roleId
        })
      })
      .then(updatedUser => cb(null, updatedUser.toJSON()))
      .catch(err => cb(err))
  }
}

module.exports = adminService
