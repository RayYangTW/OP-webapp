const { Apply, Category, User } = require('../models')

const applyServices = {
  postApply: (req, cb) => {
    const { item, description, image1, image2, image3 } = req.body
    Apply.create({
      item,
      description,
      image1,
      image2,
      image3
    })
      .then(createdApply => cb(null, { createdApply }))
      .catch(err => cb(err))
  },
  getApplies: (req, cb) => {
    return Apply.findAll({
      nest: true,
      raw: true,
      attributes: [
        'id', 'item', 'description', 'status', 'progress', 'createdAt'
      ],
      order: [['createdAt', 'DESC']],
      include: [
        { model: Category, attributes: ['id', 'category'] },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    })
      .then(applies => {
        console.log(applies)
        cb(null, applies)
      })
      .catch(err => cb(err))
  }
}

module.exports = applyServices
