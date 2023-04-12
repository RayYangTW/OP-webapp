const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const user = require('./modules/users')
const admin = require('./modules/admin')
const passport = require('../../config/passport')
const userController = require('../../controllers/pages/user-controller')
const applyController = require('../../controllers/pages/apply-controller')
const upload = require('../../middleware/multer')

const { authenticator, roleIsAdmin } = require('../../middleware/auth')
const { generalErrorHandler } = require('../../middleware/error-handler')

router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true
}), userController.signIn)
router.get('/signin', userController.signInPage)
router.post('/signup',
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
  userController.signUp)
router.get('/signup', userController.signUpPage)
router.post('/logout', userController.logout)

router.put('/manage/apply/:applyId', applyController.manageApply)
router.get('/manage/apply/:applyId', applyController.getManageApply)
router.post('/apply',
  upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]),
  body('categoryId')
    .notEmpty()
    .withMessage('必須選擇一個項目'),
  body('description')
    .isLength({ max: 200 })
    .withMessage('描述字數不可超過100字')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('描述不可為空白'),
  applyController.postApply)
router.get('/apply', authenticator, applyController.getApplyPage)

router.get('/applies/notStarted', authenticator, applyController.getNotStartedApplies)
router.get('/applies/inProgress', authenticator, applyController.getInProgressApplies)
router.get('/applies/done', authenticator, applyController.getDoneApplies)
router.get('/applies/:userId', authenticator, applyController.getMyApplies)
router.get('/applies', authenticator, applyController.getApplies)
router.get('/home', authenticator, (req, res) => res.render('home'))
router.get('/', authenticator, (req, res) => res.render('home'))
router.use('/admin', authenticator, roleIsAdmin, admin)
router.use('/users', authenticator, user)
router.use('/', generalErrorHandler)

module.exports = router
