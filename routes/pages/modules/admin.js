const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/pages/admin-controller')

router.put('/user/:userId', adminController.updateUser)
router.get('/user/:userId', adminController.getUser)
router.get('/users', adminController.getUsers)
router.get('/', (req, res) => res.render('admin-home'))

module.exports = router
