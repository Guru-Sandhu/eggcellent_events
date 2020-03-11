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

router.post('/', events.create)

router.get('/new', events.new)

module.exports = router
