const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const userController = require('../../controllers/pages/user-controller')
const applyController = require('../../controllers/pages/apply-controller')

router.post('/signup',
  body('password')
    .isLength({ min: 8 })
    .withMessage('密碼字數不可小於 8'),
  body('email')
    .isEmail()
    .withMessage('電子信箱格式不正確'),
  userController.signUp)
router.get('/signup', userController.signUpPage)
router.get('/signin', userController.signInPage)

router.put('/apply/:applyId', applyController.manageApply)
router.get('/apply/:applyId', applyController.getManageApply)
router.post('/apply',
  body('categoryId')
    .notEmpty()
    .withMessage('必須選擇一個項目'),
  body('description')
    .isLength({ max: 200 })
    .withMessage('描述字數不可超過100字'),
  applyController.postApply)
router.get('/apply', applyController.getApplyPage)

router.get('/applies/notStarted', applyController.getNotStartedApplies)
router.get('/applies/inProgress', applyController.getInProgressApplies)
router.get('/applies/done', applyController.getDoneApplies)
router.get('/applies', applyController.getApplies)
router.get('/home', (req, res) => res.render('home'))

router.get('/', (req, res) => res.render('home'))

module.exports = router
