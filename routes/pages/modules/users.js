const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const userController = require('../../../controllers/pages/user-controller')

router.put('/:userId/profile',
  body('password')
    .isLength({ min: 8 })
    .withMessage('密碼字數不可小於 8'),
  body('email')
    .isEmail()
    .withMessage('電子信箱格式不正確'),
  body('name')
    .isLength({ max: 20 })
    .withMessage('使用者名稱不可超過20字')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('使用者名稱不可為空白'),
  userController.editUser)
router.get('/:userId/profile', userController.getUser)

module.exports = router
