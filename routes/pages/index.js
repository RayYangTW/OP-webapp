const express = require('express')
const router = express.Router()
const user = require('./modules/users')
const admin = require('./modules/admin')
const auth = require('./modules/auth')
const passport = require('../../config/passport')
const userController = require('../../controllers/pages/user-controller')
const applyController = require('../../controllers/pages/apply-controller')
const upload = require('../../middleware/multer')

const { authenticator, roleIsAdmin } = require('../../middleware/auth')
const { generalErrorHandler } = require('../../middleware/error-handler')
const { signUpValidator, applyValidator } = require('../../middleware/express-validators')

router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true
}), userController.signIn)
router.get('/signin', userController.signInPage)
router.post('/signup', signUpValidator, userController.signUp)
router.get('/signup', userController.signUpPage)
router.post('/logout', userController.logout)

router.put('/manage/apply/:applyId', applyController.manageApply)
router.get('/manage/apply/:applyId', applyController.getManageApply)
router.post('/apply',
  upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]),
  applyValidator,
  applyController.postApply)
// ----
// router.post('/applytest', authenticator, applyController.sendApplication)
// router.post('/test', applyController.test)
// ----
router.get('/apply', authenticator, applyController.getApplyPage)

router.get('/applies/notStarted', authenticator, applyController.getNotStartedApplies)
router.get('/applies/inProgress', authenticator, applyController.getInProgressApplies)
router.get('/applies/done', authenticator, applyController.getDoneApplies)
router.get('/applies/:userId', authenticator, applyController.getMyApplies)
router.get('/applies', authenticator, applyController.getApplies)
router.get('/home', authenticator, (req, res) => res.render('home'))
router.get('/', authenticator, (req, res) => res.render('home'))
router.use('/auth', auth)
router.use('/admin', authenticator, roleIsAdmin, admin)
router.use('/users', authenticator, user)
router.use('/', generalErrorHandler)
router.get('*', (req, res) => res.status(404).render('error-page'))

module.exports = router
