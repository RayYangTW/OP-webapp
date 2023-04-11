const bcrypt = require('bcryptjs')

const { User, Role } = require('../models')
const { validationResult } = require('express-validator')

const userService = {
  signUp: (req, cb) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return cb(null, { errorMessages: errors.array() })
    }
    const { name, email, password, passwordCheck } = req.body
    if (password !== passwordCheck) throw new Error('Passwords do not match!')
    return Promise.all([
      Role.findOne({
        raw: true,
        where: { name: 'user' }
      }),
      User.findOne({ where: { email } })
    ])
      .then(([userRole, user]) => {
        if (user) throw new Error('Email already exists!')
        return User.create({
          name,
          email,
          password: bcrypt.hashSync(password, 10),
          roleId: userRole.id
        })
      })
      .then(signedUser => cb(null, { user: signedUser }))
      .catch(err => cb(err))
  }
}

module.exports = userService
