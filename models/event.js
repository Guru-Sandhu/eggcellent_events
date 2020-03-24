const bookshelf = require('../db/orm')

const Event = bookshelf.Model('Event', {
  tableName: 'events'
})

module.exports = Event
