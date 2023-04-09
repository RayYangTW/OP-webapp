const applyServices = require('../../services/apply-services')

const applyController = {
  postApply: (req, res, next) => {
    applyServices.postApply(req, (err, data) => err ? next(err) : res.status(200).render('home', { success_messages: '申請單成功送出', data }))
  }
}

module.exports = applyController
