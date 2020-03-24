const { event } = require('../models')

module.exports = {
  index: (req, res) => {
    event.fetchAll()
      .then(events => {
        events = events.toJSON()
        res.render('events/index', { events })
      })
      .catch(err => console.log(err))
  },
  create: (req, res) => {
    const { title, description } = req.body
    event.forge({ title, description }).save()
      .then(event => {
        res.redirect(`/events/${event.id}`)
      })
  },
  new: (req, res) => {
    res.render('events/new')
  },
  show: (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    new event ({ id }).fetch()
      .then(event => {
        event = event.toJSON()
          res.render('events/show', { event })
      })
      .catch(err => console.log(err))
  },
  delete: (req, res) => {
    const { id } = req.params
    new event({ id }).destroy()
      .then(hasDeleted => {
          res.redirect('/events')
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
