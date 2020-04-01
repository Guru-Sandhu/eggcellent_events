const bookshelf = require('../db/orm')
const Password = require('../helpers/Password')

const User = bookshelf.model('User', {
  tableName: 'users',
  initialize () {
    this.on('saving', (model, attrs, options) => {
      this.validate()
      attrs.email = this.attributes.email.toLowerCase()
      return Password.create(attrs.password_digest)
        .then(hash => {
          attrs.password_digest = hash
          delete attrs.password   
          delete attrs.passwordConfirmation
        })
    })
  },
  validate () {
    const errors = []
    if (!this.attributes.first_name) {
      errors.push(new Error('Must provide First Name'))
    }
    if (!this.attributes.last_name) {
      errors.push(new Error('Must provide Last Name'))
    }
    if (this.attributes.password_digest !== this.attributes.passwordConfirmation) {
      errors.push(new Error('passwords do not match'))
    }
    if (errors.length) {
      throw errors
    }
    return this
  }
})

module.exports = User
