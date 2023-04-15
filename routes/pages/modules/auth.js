const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signin' }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.flash('success_messages', '登入成功！')
    res.redirect('/home')
  }
)

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

module.exports = router
