
exports.up = function (knex) {
  return knex.schema.alterTable('events', t => {
    t.bigInteger('user_id').references('users.id')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('events', t => {
    t.dropColumn('user_id')
  })
}
