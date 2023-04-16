const authenticator = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  req.flash('warning_messages', '請先登入才能使用！')
  res.redirect('/signin')
}

const roleIsManager = (req, res, next) => {
  if (req.user.Role.name !== 'user') return next()
  req.flash('warning_messages', '權限錯誤')
  return res.redirect('back')
}

const roleIsAdmin = (req, res, next) => {
  if (req.user.Role.name === 'admin') return next()
  req.flash('warning_messages', '權限錯誤')
  return res.redirect('back')
}

module.exports = {
  authenticator,
  roleIsManager,
  roleIsAdmin
}
