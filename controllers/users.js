const { User } = require('../models')

module.exports = {
  index: (req, res) => {
    User.fetchAll()
      .then(users => {
        users = users.toJSON()
        res.render('users/index', { users })
      })
      .catch(err => console.log(err))
  },
  create: (req, res) => {
    const { firstName, lastName, email, password } = req.body
    User.forge({ first_name: firstName, last_name: lastName, email, password_digest: password }).save()
      .then(user => {
        res.redirect(`/users/${user.id}`)
      })
  },
  new: (req, res) => {
    res.render('users/new')
  },
  show: (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    new User ({ id }).fetch()
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
  update: (req,res) => {
    const { id } = req.params
    const { first_name, lastName, email, password } = req.body
    new User({ id}).save({ first_name: firstName, last_name: lastName, email, password_digest: password })
      .then(user => {
          res.redirect(`/users/${user.id}`)
      })
      .catch(err => console.log(err))
  }
}
