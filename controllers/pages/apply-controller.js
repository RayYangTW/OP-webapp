const applyServices = require('../../services/apply-services')

const applyController = {
  getApplyPage: (req, res, next) => {
    applyServices.getApplyPage(req, (err, data) => err ? next(err) : res.status(200).render('apply', { data }))
  },
  postApply: (req, res, next) => {
    applyServices.postApply(req, (err, data) => {
      if (err) return next(err)
      if (data.errorMessages) return res.status(401).render('apply', { error_messages: data.errorMessages, data })
      return res.status(200).render('home', { success_messages: '申請單成功送出', data })
    })
  },
  getApplies: (req, res, next) => {
    applyServices.getApplies(req, (err, data) => err ? next(err) : res.status(200).render('applies', { data }))
  },
  getDoneApplies: (req, res, next) => {
    applyServices.getDoneApplies(req, (err, data) => err ? next(err) : res.status(200).render('applies-done', { data }))
  },
  getInProgressApplies: (req, res, next) => {
    applyServices.getInProgressApplies(req, (err, data) => err ? next(err) : res.status(200).render('applies-in-progress', { data }))
  },
  getNotStartedApplies: (req, res, next) => {
    applyServices.getNotStartedApplies(req, (err, data) => err ? next(err) : res.status(200).render('applies-not-started', { data }))
  },
  getManageApply: (req, res, next) => {
    applyServices.getManageApply(req, (err, data) => err ? next(err) : res.status(200).render('manage-apply', { data }))
  }
}

module.exports = applyController
