const adminService = require('../../services/admin-services')

const adminController = {
  getUsers: (req, res, next) => {
    adminService.getUsers(req, (err, data) => err ? next(err) : res.status(200).render('admin-users-table', { data }))
  },
  getUser: (req, res, next) => {
    adminService.getUser(req, (err, data) => err ? next(err) : res.status(200).render('admin-user-form', { data }))
  },
  updateUser: (req, res, next) => {
    adminService.updateUser(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '修改成功！')
      return res.status(200).redirect('/admin/users')
    })
  }
}

module.exports = adminController
