const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/pages/user-controller')
const { signUpValidator } = require('../../../middleware/express-validators')

router.put('/:userId/profile', signUpValidator, userController.editUser)
router.get('/:userId/profile', userController.getUser)

module.exports = router
