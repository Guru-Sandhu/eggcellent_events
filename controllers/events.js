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
  delete: (req, res, next) => {
    const user = res.locals.user
    const { id } = req.params
    let event
    new Event({ id }).fetch()
      .then(result => {
        event = result
        if (event.attributes.user_id === user.id) {
          return event.destroy()
        }
        req.session.sessionFlash.error = 'You are not allowed to do this action'
        res.redirect(`/events/${event.id}`)
      })
      .then(() => {
        res.redirect('/events')
      })
      .catch(err => {
        console.log(err)
        next(err)
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
  update: (req, res, next) => {
    const user = res.locals.user
    const { id } = req.params
    const { title, description } = req.body
    let event
    new Event({ id }).fetch()
      .then(result => {
        event = result
        if (event.attributes.user_id === user.id) {
          return event.save({ title, description })
        } else {
          req.session.sessionFlash.error = 'You are not allowed to do this action'
          res.redirect(`/events/${event.id}`)
        }
      })
      .then(event => {
        event = event.toJSON()
        res.redirect(`/events/${event.id}`)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}
