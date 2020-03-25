const { User } = require('../models')

module.exports = {
  new: (req, res) => {
    res.render('sessions/new')
  },
  create: (req, res) => {
    const { email, password } = req.body
    new User({ email }).fetch()
      .then(user => {
        user = user.toJSON()
        if (user.password_digest === password) {
          req.session.id = user.id
        }
        res.redirect('/')
      })
  }
}
