function sessionFlash (req, res, next) {
  res.locals.sessionFlash = {}
  if (req.session && req.session.sessionFlash) {
    res.locals.sessionFlash = req.session.sessionFlash
  }
  req.session.sessionFlash = {}
  next()
}

module.exports = sessionFlash
