const bookshelf = require('../db/orm')
const Password = require('../helpers/Password')

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
      if (attrs.password !== attrs.passwordConfirmation) {
        throw new Error('passwords do not match')
      }
      attrs.email = this.attributes.email.toLowerCase()
      return Password.create(attrs.password_digest)
        .then(hash => {
          attrs.password_digest = hash
          delete attrs.password
          delete attrs.passwordConfirmation
        })
    })
  }
})

module.exports = User
