const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
// const LineStrategy = require('passport-line').Strategy
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

// Google
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    profileFields: ['email', 'displayName']
  },
  async (accessToken, refreshToken, profile, cb) => {
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

// Line
// passport.use(
//   new LineStrategy({
//     channelID: process.env.LINE_CLIENT_ID,
//     channelSecret: process.env.LINE_SECRET,
//     callbackURL: process.env.LINE_CALLBACK,
//     profileFields: ['email', 'displayName']
//   },
//   async (accessToken, refreshToken, profile, cb) => {
//     const { userId, displayName } = profile._json
//     const email = `${userId}@line.com`
//     return Promise.all([
//       User.findOne({ where: { email } }),
//       Role.findOne({
//         raw: true,
//         where: { name: 'user' }
//       })
//     ])
//       .then(([user, userRole]) => {
//         if (user) return cb(null, user)
//         const randomPassword = Math.random().toString(36).slice(-8)
//         return User.create({
//           name: displayName,
//           email,
//           password: bcrypt.hashSync(randomPassword, 10),
//           roleId: userRole.id
//         })
//           .then(user => cb(null, user))
//           .catch(err => cb(err, false))
//       })
//   }
//   )
// )

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
