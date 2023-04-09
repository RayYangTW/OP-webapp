const bcrypt = require('bcryptjs')

const { User } = require('../models')
const { validationResult } = require('express-validator')

const userService = {
  signUp: (req, cb) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return cb(null, { errorMessages: errors.array() })
    }
    const reqEmail = req.body.email
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')
    User.findOne({ where: { email: reqEmail } })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: 'user',
        categoryId: null
      }))
      .then(signedUser => cb(null, { user: signedUser }))
      .catch(err => cb(err))
  }

}

module.exports = userService
