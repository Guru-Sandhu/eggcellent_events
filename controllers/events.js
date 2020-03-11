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
        res.send('events/inde')
      })
  },
  new: (req, res) => {
    res.render('events/new')
  }
}
