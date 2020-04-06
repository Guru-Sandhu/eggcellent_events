const { Event } = require('../models')

module.exports = {
  index: (req, res) => {
    Event.fetchAll()
      .then(events => {
        events = events.toJSON()
        res.render('events/index', { events })
      })
      .catch(err => console.log(err))
  },
  create: (req, res) => {
    const user = res.locals.user
    const { title, description } = req.body
    Event.forge({ title, description, user_id: user.id }).save()
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
    new Event({ id }).fetch({ withRelated: 'owner' })
      .then(event => {
        event = event.toJSON()
        res.render('events/show', { event })
      })
      .catch(err => console.log(err))
  },
  delete: (req, res) => {
    const { id } = req.params
    new Event({ id }).destroy()
      .then(hasDeleted => {
        res.redirect('/events')
      })
      .catch(err => {
        console.log(err)
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    new Event({ id }).fetch()
      .then(event => {
        event = event.toJSON()
        res.render('events/edit', { event })
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    new Event({ id }).save({ title, description })
      .then(event => {
        res.redirect(`/events/${event.id}`)
      })
      .catch(err => console.log(err))
  }
}
