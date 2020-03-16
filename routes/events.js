const express = require('express')
const router = express.Router()
const { events } = require('../controllers')

// router.get('/', (req, res) => {
//   knex.select('*').from('events')
//     .then(events => {
//       res.render('events/index', { events })
//     })
// })

router.get('/', events.index)

router.get('/:id', events.show)

router.post('/', events.create)

router.get('/new', events.new)

router.get('/:id', events.delete)

module.exports = router
