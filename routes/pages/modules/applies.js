const express = require('express')
const router = express.Router()
const applyController = require('../../../controllers/pages/apply-controller')

router.get('/notStarted', applyController.getNotStartedApplies)
router.get('/inProgress', applyController.getInProgressApplies)
router.get('/done', applyController.getDoneApplies)
router.get('/:userId', applyController.getMyApplies)
router.get('/', applyController.getApplies)

module.exports = router
