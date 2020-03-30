function authenticateUser (req, res, next) {
  if (res.locals.user.id) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = authenticateUser
