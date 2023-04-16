const { validationResult } = require('express-validator')
const { Apply, Category, User, Role } = require('../models')
const { transferDateTime } = require('../helpers/dayjs-helpers')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { sendApplyEmail } = require('../helpers/send-email-helper')

const applyServices = {
  // pages only 到申請單頁面並載入項目清單
  getApplyPage: (req, cb) => {
    return Category.findAll({
      nest: true,
      raw: true,
      attributes: [
        'id', 'category'
      ]
    })
      .then(categories => cb(null, categories))
      .catch(err => cb(err))
  },
  // 送出申請，利用imgurFileHandler來上傳照片，注意Status的值
  postApply: (req, cb) => {
    const { categoryId, description } = req.body
    const { image1, image2, image3 } = req.files
    const imageFile1 = image1 ? image1[0] : null
    const imageFile2 = image2 ? image2[0] : null
    const imageFile3 = image3 ? image3[0] : null
    const userId = req.user.id
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return cb(null, { errorMessages: errors.array(), categoryId, description })
    }
    return Promise.all([
      imgurFileHandler(imageFile1),
      imgurFileHandler(imageFile2),
      imgurFileHandler(imageFile3)
    ])
      .then(([image1, image2, image3]) => {
        return Apply.create({
          categoryId,
          description,
          image1,
          image2,
          image3,
          status: 'notStarted',
          userId
        })
      })
      .then(createdApply => {
        createdApply = createdApply.toJSON()
        return Apply.findOne({
          raw: true,
          nest: true,
          where: { id: createdApply.id },
          include: [
            {
              model: Category,
              attributes: ['category'],
              include: [{
                model: User,
                attributes: ['id', 'name', 'email']
              }]
            }
          ]
        })
          .then(result => {
            cb(null, result)
            sendApplyEmail(req, result)
          })
          .catch(err => cb(err))
      })
      .catch(err => cb(err))
  },
  // 取得所有申請單資料
  getApplies: (req, cb) => {
    return Apply.findAll({
      nest: true,
      raw: true,
      attributes: [
        'id', 'description', 'status', 'progress', 'createdAt'
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
  // 取得所有已完成的申請單資料
  getDoneApplies: (req, cb) => {
    return Apply.findAll({
      where: { status: 'done' },
      nest: true,
      raw: true,
      attributes: [
        'id', 'description', 'status', 'progress', 'createdAt', 'updatedAt'
      ],
      order: [['updatedAt', 'DESC']],
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
  // 取得所有正在處理中的申請單資料
  getInProgressApplies: (req, cb) => {
    return Apply.findAll({
      where: { status: 'inProgress' },
      nest: true,
      raw: true,
      attributes: [
        'id', 'description', 'status', 'progress', 'createdAt'
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
  // 取得所有尚未處理的申請單資料
  getNotStartedApplies: (req, cb) => {
    return Apply.findAll({
      where: { status: 'notStarted' },
      nest: true,
      raw: true,
      attributes: [
        'id', 'description', 'status', 'progress', 'createdAt'
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
  // 利用登入id取得所有「我的申請單」的資料
  getMyApplies: (req, cb) => {
    const userId = req.user.id
    return Apply.findAll({
      nest: true,
      raw: true,
      where: { userId },
      attributes: [
        'id', 'description', 'status', 'progress', 'createdAt'
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
  // 取得申請單管理頁面與其資料
  getManageApply: (req, cb) => {
    const { applyId } = req.params
    return Apply.findOne({
      nest: true,
      raw: true,
      where: { id: applyId },
      attributes: [
        'id', 'description', 'status', 'progress', 'createdAt', 'image1', 'image2', 'image3'
      ],
      include: [
        { model: Category, attributes: ['id', 'category'] },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    })
      .then(applyData => cb(null, applyData))
      .catch(err => cb(err))
  },
  // 送出管理申請單資料
  manageApply: (req, cb) => {
    const { applyId } = req.params
    const { status, progress } = req.body
    return Apply.findOne({
      where: { id: applyId },
      attributes: [
        'id', 'description', 'status', 'progress', 'createdAt', 'image1', 'image2', 'image3'
      ],
      include: [
        { model: Category, attributes: ['id', 'category'] },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    })
      .then(applyData => {
        const updateData = {
          status,
          progress
        }
        return applyData.update(updateData)
      })
      .then(managedData => cb(null, managedData))
      .catch(err => cb(err))
  },
  // User查看申請單
  userCheckApply: (req, cb) => {
    const { applyId } = req.params
    return Apply.findOne({
      nest: true,
      raw: true,
      where: { id: applyId },
      attributes: [
        'id', 'description', 'status', 'progress', 'createdAt', 'image1', 'image2', 'image3'
      ],
      include: [
        { model: Category, attributes: ['id', 'category'] },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    })
      .then(applyData => cb(null, applyData))
      .catch(err => cb(err))
  },
  test: (req, cb) => {
    return Category.findAll({
      where: { id: 1 },
      raw: true,
      nest: true,
      include: [
        { model: User, include: [{ model: Role }] }
      ]
    })
      .then(data => console.log(data))
  }
}

module.exports = applyServices
