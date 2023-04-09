const userService = require('../../services/user-services')

const userController = {
  signUpPage: (req, res) => { res.render('signup') },
  signUp: (req, res, next) => {
    userService.signUp(req, (err, data) => {
      const { name, email } = req.body
      if (err) return next(err)
      if (data.errorMessages) {
        return res.render('signup', { error_messages: data.errorMessages, name, email })
      }
      return res.redirect('/signin')
    })
  },
  signInPage: (req, res) => { res.render('signin') }
}

module.exports = userController
