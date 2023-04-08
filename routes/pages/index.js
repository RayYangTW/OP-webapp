const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')

router.post('/signup', userController.signUp)
router.get('/signup', userController.signUpPage)

router.get('/', (req, res) => res.render('home'))

module.exports = router
