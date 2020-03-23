const express = require('express')
const router = express.Router()
const { events } = require('../controllers')

router.get('/', events.index)

router.get('/new', events.new)

router.get('/:id', events.show)

router.get('/:id/edit', events.edit)

router.patch('/:id', events.update)

router.post('/', events.create)

router.delete('/:id', events.delete)

module.exports = router
