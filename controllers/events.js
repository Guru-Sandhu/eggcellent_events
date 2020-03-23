const { event } = require('../models')

module.exports = {
  index: (req, res) => {
    event.all()
      .then(events => {
        res.render('events/index', { events })
      })
  },
  create: (req, res) => {
    const { title, description } = req.body
    event.create({ title, description })
      .then(event => {
        res.redirect(`/events/${event.id}`)
      })
  },
  new: (req, res) => {
    res.render('events/new')
  },
  show: (req, res) => {
    const { id } = req.params
    event.one(parseInt(id))
      .then(event => {
          res.render('events/show', { event })
      })
  },
  delete: (req, res) => {
    const { id } = req.params
    event.delete(id)
      .then(hasDeleted => {
        if (hasDeleted) {
          res.redirect('/events')
        } else {
          res.redirect(`/events/${id}`)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    event.one(id)
      .then(event => {
          res.render('events/edit', { event })
      })
  },
  update: (req,res) => {
    const { id } = req.params
    const { title, description } = req.body
    event.update({ id, title, description })
      .then(event => {
        if (event) {
          res.redirect(`/events/${event.id}`)
        } else {
          res.redirect(`/events/${id}/edit`)
        }
      })
  }
}
