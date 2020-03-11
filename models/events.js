const knex = require('../db/client')

module.exports = {
  all: () => {
    return knex.select().from('events')
      .then(events => {
        return events
      })
  }
}
