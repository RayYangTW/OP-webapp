const express = require('express')
// const { body } = require('express-validator')
const router = express.Router()
const adminController = require('../../../controllers/pages/admin-controller')

router.get('/users', adminController.getUsers)
router.get('/', (req, res) => res.render('admin-home'))

module.exports = router
