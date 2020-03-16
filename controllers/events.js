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
        res.send(event)
      })
  },
  new: (req, res) => {
    res.render('events/new')
  },
  show: (req, res) => {
    const { id } = req.params
    event.one(parseInt(id))
      .then(events => {
        if (events.length > 0) {
          res.render('events/show', { event: events[0] })
        } else {
          res.send(`NO event with id:${id}`)
        }
      })
  }
}
