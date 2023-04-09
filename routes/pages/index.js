const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')
const { body } = require('express-validator')

router.post(
  '/signup',
  body('password')
    .isLength({ min: 8 })
    .withMessage('密碼字數不可小於 8'),
  body('email')
    .isEmail()
    .withMessage('電子信箱格式不正確'),
  userController.signUp)

router.get('/signup', userController.signUpPage)
router.get('/signin', userController.signInPage)

router.get('/', (req, res) => res.render('home'))

module.exports = router
