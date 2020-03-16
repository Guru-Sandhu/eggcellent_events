const express = require('express')
const router = express.Router()
const { events } = require('../controllers')

router.get('/', events.index)

router.get('/:id', events.show)

router.post('/', events.create)

router.get('/new', events.new)

router.delete('/:id', events.delete)

module.exports = router
