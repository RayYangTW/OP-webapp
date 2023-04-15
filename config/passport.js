const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
// const assert = require('assert')
const { User, Role } = require('../models')

// Local
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, cb) => {
      User.findOne({ where: { email } })
        .then(user => {
          if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
          bcrypt.compare(password, user.password).then(res => {
            if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
            return cb(null, user)
          })
        })
        .catch(err => cb(err))
    }
  )
)

// FB
passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log(profile)
    const { name, email } = profile._json
    return Promise.all([
      User.findOne({ where: { email } }),
      Role.findOne({
        raw: true,
        where: { name: 'user' }
      })
    ])
      .then(([user, userRole]) => {
        if (user) return cb(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        return User.create({
          name,
          email,
          password: bcrypt.hashSync(randomPassword, 10),
          roleId: userRole.id
        })
          .then(user => cb(null, user))
          .catch(err => cb(err, false))
      })
  }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  return User.findByPk(id, {
    include: [
      { model: Role }
    ]
  })
    .then(user => cb(null, user.toJSON()))
    .catch(err => cb(err))
})
module.exports = passport
