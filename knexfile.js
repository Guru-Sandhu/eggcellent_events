// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'eggcellent_events_wadd',
      username: 'guru',
      password: 'Sandhu@123'
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}
