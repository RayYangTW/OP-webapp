const applyServices = require('../../services/apply-services')

const applyController = {
  applyPage: (req, res) => { res.render('apply') },
  postApply: (req, res, next) => {
    applyServices.postApply(req, (err, data) => err ? next(err) : res.status(200).render('home', { success_messages: '申請單成功送出', data }))
  },
  getApplies: (req, res, next) => {
    applyServices.getApplies(req, (err, data) => err ? next(err) : res.status(200).render('applies', { data }))
  }
}

module.exports = applyController
