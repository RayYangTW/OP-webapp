const userService = require('../../services/user-services')

const userController = {
  signUpPage: (req, res) => { res.render('signup') },
  signUp: (req, res, next) => {
    userService.signUp(req, (err, data) => {
      if (err) return next(err)
      return res.redirect('/signin')
    })
  }
}

module.exports = userController
