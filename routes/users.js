const express = require('express')
const router = express.Router()
const { users } = require('../controllers')

router.get('/', users.index)

router.get('/new', users.new)

router.get('/:id', users.show)

router.get('/:id/edit', users.edit)

router.patch('/:id', users.update)

router.post('/new', users.create)

router.delete('/:id', users.delete)

module.exports = router
