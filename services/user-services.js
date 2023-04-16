const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const { User, Role, Category } = require('../models')
const { validationResult } = require('express-validator')

const userService = {
  // 註冊功能
  signUp: (req, cb) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return cb(null, { errorMessages: errors.array() })
    }
    const { name, email, password, passwordCheck } = req.body
    if (password !== passwordCheck) throw new Error('密碼不一致!')
    return Promise.all([
      Role.findOne({
        raw: true,
        where: { name: 'user' }
      }),
      User.findOne({ where: { email } })
    ])
      .then(([userRole, user]) => {
        if (user) throw new Error('此Email已存在!')
        return User.create({
          name,
          email,
          password: bcrypt.hashSync(password, 10),
          roleId: userRole.id
        })
      })
      .then(signedUser => cb(null, { user: signedUser }))
      .catch(err => cb(err))
  },
  // 取得特定User帳戶資料
  getUser: (req, cb) => {
    const userId = req.user.id
    const currentUserId = Number(req.params.userId)
    if (userId !== currentUserId) throw new Error('不可修改他人資料')
    return User.findByPk(userId, {
      raw: true,
      nest: true,
      attributes: [
        'id', 'name', 'email'
      ],
      include: [
        { model: Role },
        { model: Category }
      ]
    })
      .then(user => cb(null, user))
      .catch(err => cb(err))
  },
  // 編輯帳戶資料
  editUser: (req, cb) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return cb(null, { errorMessages: errors.array() })
    }
    const userId = req.user.id
    const currentUserId = Number(req.params.userId)
    if (userId !== currentUserId) throw new Error('不可修改他人資料')
    const { name, email, password, passwordCheck } = req.body
    if (password !== passwordCheck) throw new Error('密碼不一致!')
    return Promise.all([
      User.findByPk(userId),
      User.findOne({ where: { email, id: { [Op.ne]: userId } } })
    ])
      .then(([user, existUser]) => {
        if (existUser) throw new Error('Email重複！')
        return user.update({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        })
      })
      .then(updatedUser => {
        updatedUser = updatedUser.toJSON()
        delete updatedUser.password
        cb(null, updatedUser)
      })
      .catch(err => cb(err))
  }
}

module.exports = userService
