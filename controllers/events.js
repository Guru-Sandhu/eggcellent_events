const knex = require('../db/client')
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
    knex.insert({ title, description }).into('events')
      .then(() => {
        res.redirect('/events')
      })
      .catch(() => {
        res.render('events/new')
      })
  },
  new: (req, res) => {
    res.render('events/new')
  }
}
