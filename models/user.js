const bookshelf = require('../db/orm')

const User = bookshelf.model('User', {
  tableName: 'users',
  initialize () {
    this.on('saving', (model, attrs, options) => {
      if (!attrs.first_name) {
        throw new Error('Must provide First Name')
      }
      if (!attrs.last_name) {
        throw new Error('Must provide Last Name')
      }
    })
  }
})

module.exports = User
