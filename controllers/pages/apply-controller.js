const applyServices = require('../../services/apply-services')

const applyController = {
  getApplyPage: (req, res, next) => {
    applyServices.getApplyPage(req, (err, data) => err ? next(err) : res.status(200).render('apply', { data }))
  },
  postApply: (req, res, next) => {
    applyServices.postApply(req, (err, data) => {
      if (err) return next(err)
      if (data.errorMessages) return res.status(401).render('apply', { error_messages: data.errorMessages, data })
      return res.status(200).render('home', { success_messages: '申請單成功建立，已通知負責人。', data })
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
  },
  manageApply: (req, res, next) => {
    applyServices.manageApply(req, (err, data) => err ? next(err) : res.status(200).redirect('/applies'))
  },
  getMyApplies: (req, res, next) => {
    applyServices.getMyApplies(req, (err, data) => err ? next(err) : res.status(200).render('applies-belong-me', { data }))
  },
  userCheckApply: (req, res, next) => {
    applyServices.userCheckApply(req, (err, data) => err ? next(err) : res.status(200).render('check-apply', { data }))
  }
  // test: (req, res, next) => {
  //   applyServices.test(req, (err, data) => err ? next(err) : res.status(200).render('home', { success_messages: '已寄信通知負責人', data }))
  // },
}

module.exports = applyController
