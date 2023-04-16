const express = require('express')
const router = express.Router()
const applyController = require('../../../controllers/pages/apply-controller')

router.put('/apply/:applyId', applyController.manageApply)
router.get('/apply/:applyId', applyController.getManageApply)

module.exports = router
