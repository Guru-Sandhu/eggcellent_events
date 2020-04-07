function sessionFlash (req, res, next) {
  res.locals.sessionFlash = {}
  req.session.sessionFlash = {}
  if (req.session && req.session.sessionFlash) {
    res.locals.sessionFlash = req.session.sessionFlash
    res.session.sessionFlash = {}
  }
  next()
}

module.exports = sessionFlash
