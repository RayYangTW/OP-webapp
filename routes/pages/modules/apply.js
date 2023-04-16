const express = require('express')
const router = express.Router()
const upload = require('../../../middleware/multer')
const applyController = require('../../../controllers/pages/apply-controller')
const { applyValidator } = require('../../../middleware/express-validators')

router.get('/:applyId', applyController.userCheckApply)
router.post('/',
  upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]),
  applyValidator,
  applyController.postApply)

router.get('/', applyController.getApplyPage)

module.exports = router
