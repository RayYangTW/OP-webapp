const express = require('express')
const router = express.Router()

const passport = require('passport')

// FB
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signin' }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.flash('success_messages', '登入成功！')
    res.redirect('/home')
  }
)

// Google
router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  })

// Line
router.get('/line',
  passport.authenticate('line'))

router.get('/line/callback',
  passport.authenticate('line', { failureRedirect: '/signin' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  })

module.exports = router
