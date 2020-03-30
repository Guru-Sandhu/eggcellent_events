const express = require('express')
const router = express.Router()
const { events } = require('../controllers')
const authenticateUser = require('../middleware/authenticateUser')

router.get('/', events.index)

router.get('/new', authenticateUser, events.new)

router.get('/:id', events.show)

router.get('/:id/edit', authenticateUser, events.edit)

router.patch('/:id', authenticateUser, events.update)

router.post('/', authenticateUser, events.create)

router.delete('/:id', authenticateUser, events.delete)

module.exports = router
