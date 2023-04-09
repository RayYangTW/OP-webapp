const { Apply, Category, User } = require('../models')
const { transferDateTime } = require('../helpers/dayjs-helpers')

const applyServices = {
  postApply: (req, cb) => {
    const { item, description, image1, image2, image3 } = req.body
    Apply.create({
      item,
      description,
      image1,
      image2,
      image3,
      status: 'notStarted'
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
        const applyResult = applies.map(a => ({
          ...a,
          applyDate: transferDateTime(a.createdAt)
        }))
        cb(null, applyResult)
      })
      .catch(err => cb(err))
  },
  getDoneApplies: (req, cb) => {
    return Apply.findAll({
      where: { status: 'done' },
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
        const applyResult = applies.map(a => ({
          ...a,
          applyDate: transferDateTime(a.createdAt)
        }))
        cb(null, applyResult)
      })
      .catch(err => cb(err))
  },
  getInProgressApplies: (req, cb) => {
    return Apply.findAll({
      where: { status: 'inProgress' },
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
        const applyResult = applies.map(a => ({
          ...a,
          applyDate: transferDateTime(a.createdAt)
        }))
        cb(null, applyResult)
      })
      .catch(err => cb(err))
  },
  getNotStartedApplies: (req, cb) => {
    return Apply.findAll({
      where: { status: 'notStarted' },
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
        const applyResult = applies.map(a => ({
          ...a,
          applyDate: transferDateTime(a.createdAt)
        }))
        cb(null, applyResult)
      })
      .catch(err => cb(err))
  }
}

module.exports = applyServices
