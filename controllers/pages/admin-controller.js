const adminService = require('../../services/admin-services')

const adminController = {
  getUsers: (req, res, next) => {
    adminService.getUsers(req, (err, data) => err ? next(err) : res.status(200).render('admin-users-table', { data }))
  }
}

module.exports = adminController
