const { Apply } = require('../models')

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
  }
}

module.exports = applyServices
