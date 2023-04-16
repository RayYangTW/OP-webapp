const express = require('express')
const router = express.Router()
const user = require('./modules/users')
const admin = require('./modules/admin')
const auth = require('./modules/auth')
const apply = require('./modules/apply')
const applies = require('./modules/applies')
const manage = require('./modules/manage')
const passport = require('../../config/passport')
const userController = require('../../controllers/pages/user-controller')

const { authenticator, roleIsAdmin, roleIsManager } = require('../../middleware/auth')
const { generalErrorHandler } = require('../../middleware/error-handler')
const { signUpValidator } = require('../../middleware/express-validators')

router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true
}), userController.signIn)
router.get('/signin', userController.signInPage)
router.post('/signup', signUpValidator, userController.signUp)
router.get('/signup', userController.signUpPage)
router.post('/logout', userController.logout)
router.get('/home', authenticator, (req, res) => res.render('home'))
router.get('/', authenticator, (req, res) => res.render('home'))

router.use('/auth', auth)
router.use('/apply', authenticator, apply)
router.use('/manage', authenticator, roleIsManager, manage)
router.use('/applies', authenticator, applies)
router.use('/admin', authenticator, roleIsAdmin, admin)
router.use('/users', authenticator, user)
router.use('/', generalErrorHandler)
router.get('*', (req, res) => res.status(404).render('error-page'))

module.exports = router
