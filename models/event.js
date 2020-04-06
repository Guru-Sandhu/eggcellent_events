const bookshelf = require('../db/orm')

const Event = bookshelf.model('Event', {
  tableName: 'events',
  owner () {
    return this.belongsTo('User')
  }
})

module.exports = Event
