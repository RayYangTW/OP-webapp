const userService = require('../../services/user-services')

const userController = {
  signUpPage: (req, res) => { res.render('signup') },
  signUp: (req, res, next) => {
    userService.signUp(req, (err, data) => err ? next(err) : res.json({ data }))
  },
  signInPage: (req, res) => { res.render('signin') }
}

module.exports = userController
