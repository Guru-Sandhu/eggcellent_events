const { User } = require('../models')
const Password = require('../helpers/Password')

module.exports = {
  new: (req, res) => {
    res.render('sessions/new')
  },
  create: (req, res) => {
    const { email, password } = req.body
    new User({ email }).fetch()
      .then(u => {
        user = u.toJSON()
        return Password.compare(password, user.password_digest)
      })
      .then(result => {
        if (result) {
          console.log()
          req.session.id = user.id
          res.redirect('/')
        } else {
          res.send('Wrong credentials')
        }
      })
      .catch(err => {
        console.log(err)
        console.log('Bookshelf throws CustomError: EmptyResponse when .fetch() does not retrieve a record')
        res.send('Wrong credentials')
      })
  }
}
