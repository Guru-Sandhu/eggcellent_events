const knex = require('../db/client')

module.exports = {
  all: () => {
    return knex.select().from('events')
      .then(events => {
        return events
      })
  },
  one: (id) => {
    return knex.select().from('events').where({ id: id })
  },
  create: ({ title, description }) => {
    return knex.insert({ title, description }).into('events')
      .returning('*')
      .then(newEvent => {
        return newEvent
      })
  },
  delete: (id) => {
    return knex.delete().from('events').where({ id: id })
  },
  update: ({ id , title, description}) => {
    return knex('events').update({ title, description}).where({ id }).returning('*')
  }
}
