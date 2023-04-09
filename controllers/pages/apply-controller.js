const applyServices = require('../../services/apply-services')

const applyController = {
  applyPage: (req, res) => { res.render('apply') },
  postApply: (req, res, next) => {
    applyServices.postApply(req, (err, data) => err ? next(err) : res.status(200).render('home', { success_messages: '申請單成功送出', data }))
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
  }
}

module.exports = applyController
