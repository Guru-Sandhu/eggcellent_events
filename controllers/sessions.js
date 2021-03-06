const { User } = require('../models')
const Password = require('../helpers/Password')

module.exports = {
  new: (req, res) => {
    res.render('sessions/new', { session: req.session})
  },
  create: (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()
    new User({ email }).fetch()
      .then(u => {
        user = u.toJSON()
        return Password.compare(password, user.password_digest)
      })
      .then(result => {
        if (result) {
          console.log()
          req.session.user = user
          res.redirect('/')
        } else {
          res.send('Wrong credentials')
        }
      })
      .catch(err => {
        console.log(err)
        console.log('Bookshelf throws CustomError: EmptyResponse when .fetch() does not retrieve a record')
      })
  },
  delete: (req, res) => {
    req.session = null
    res.redirect('/')
    res.send('logged out')
  }
}
