function setSessionUser (req, res, next)  {
  res.locals.user = {}
  if (req.session.user) {
    res.locals.user = req.session.user
  }
  next()
}
module.exports = setSessionUser
