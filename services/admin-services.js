const { User, Role, Category } = require('../models')

const adminService = {
  // 取得所有User資料，及其相關Role與Category
  getUsers: (req, cb) => {
    return User.findAll({
      raw: true,
      nest: true,
      attributes: [
        'id', 'name', 'email', 'roleId', 'categoryId'
      ],
      include: [
        { model: Role },
        { model: Category }
      ],
      order: [
        ['name', 'ASC']
      ]
    })
      .then(users => cb(null, users))
      .catch(err => cb(err))
  },
  // 取得特定User
  getUser: (req, cb) => {
    const userId = req.params.userId
    return Promise.all([
      Role.findAll({ raw: true }),
      Category.findAll({ raw: true }),
      User.findByPk(userId, {
        raw: true,
        nest: true,
        attributes: [
          'id', 'name', 'email', 'categoryId', 'roleId'
        ]
      })
    ])
      .then(([role, category, user]) => cb(null, { role, category, user }))
      .catch(err => cb(err))
  },
  // admin 更新User的資料（角色權限與負責項目）
  updateUser: (req, cb) => {
    const userId = req.params.userId
    const { categoryId, roleId } = req.body
    return Promise.all([
      User.findOne({
        raw: true,
        nest: true,
        where: { categoryId },
        attributes: [
          'id', 'name', 'email', 'categoryId', 'roleId'
        ]
      }),
      User.findByPk(userId, {
        attributes: [
          'id', 'name', 'email', 'categoryId', 'roleId'
        ]
      }),
      Category.findAll({
        raw: true,
        nest: true
      }),
      Role.findOne({
        where: { name: 'user' },
        raw: true,
        nest: true
      })
    ])
      .then(([existManager, user, categories, roleUser]) => {
        const checkUser = user.toJSON()
        if (existManager.id !== checkUser.id) throw new Error('項目已有負責人')
        if (Number(categoryId) !== '' && Number(roleId) === roleUser.id) throw new Error('負責項目的角色權限不可為user')
        return user.update({
          categoryId: categoryId === '' ? null : categoryId,
          roleId
        })
      })
      .then(updatedUser => cb(null, updatedUser.toJSON()))
      .catch(err => cb(err))
  }
}

module.exports = adminService
