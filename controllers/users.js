const { User } = require('../models')
const Password = require('../helpers/Password')
module.exports = {
  index: (req, res) => {
    User.fetchAll()
      .then(users => {
        users = users.toJSON()
        res.render('users/index', { users })
      })
      .catch(err => console.log(err))
  },
  create: (req, res, next) => {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body
    new User({ first_name: firstName, last_name: lastName, email, password_digest: password, passwordConfirmation: passwordConfirmation }).save()
      .then(user => {
        user = user.toJSON()
        req.session.sessionFlash.confirm = 'User Created!'
        res.redirect(`/users/${user.id}`)
      })
      .catch(err => {
        console.log(err)
        req.session.sessionFlash = {}
        req.session.sessionFlash.errors = err
        res.redirect('users/new')
      })
  },
  new: (req, res) => {
    res.render('users/new')
  },
  show: (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    new User({ id }).fetch({ withRelated: 'events' })
      .then(user => {
        user = user.toJSON()
        res.render('users/show', { user })
      })
      .catch(err => console.log(err))
  },
  delete: (req, res) => {
    const { id } = req.params
    new User({ id }).destroy()
      .then(hasDeleted => {
        res.redirect('/users')
      })
      .catch(err => {
        console.log(err)
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    new User({ id }).fetch()
      .then(user => {
        user = user.toJSON()
        res.render('users/edit', { user })
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, password } = req.body
    new User({ id }).save({ first_name: firstName, last_name: lastName, email, password_digest: password })
      .then(user => {
        res.redirect(`/users/${user.id}`)
      })
      .catch(err => {
        res.send(err)
      })
  }
}
