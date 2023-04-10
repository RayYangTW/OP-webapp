const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const assert = require('assert')
const { User } = require('../models')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, cb) => {
      User.findOne({ where: { email } }).then(user => {
        assert(user, '帳號不存在！')
        bcrypt.compare(password, user.password).then(res => {
          assert(res, '帳號或密碼輸入錯誤！')
          return cb(null, user)
        })
          .catch(err => cb(err))
      })
        .catch(err => cb(err))
    }
  )
)

passport.serializeUser((user, cb) => {
  console.log(user.id)
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  return User.findByPk(id)
    .then(user => cb(null, user.toJSON()))
    .catch(err => cb(err))
})
module.exports = passport
