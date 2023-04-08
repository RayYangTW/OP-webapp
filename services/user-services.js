const bcrypt = require('bcryptjs')

const { User } = require('../models')

const userService = {
  signUp: (req, cb) => {
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
