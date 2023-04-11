const authenticator = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  req.flash('warning_msg', '請先登入才能使用！')
  res.redirect('/signin')
}

const roleIsManager = (req, res, next) => {
  if (req.user.role === 'manager') return next()
  req.flash('warning_msg', '權限錯誤')
  return res.redirect('back')
}

module.exports = {
  authenticator
}
