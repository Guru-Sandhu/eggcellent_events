const bookshelf = require('../db/orm')
const Password = require('../helpers/Password')
const Checkit = require('checkit')

const rules = {
  first_name: 'required',
  last_name: 'required',
  email: ['required', 'email'],
  password_digest: ['required', 'minLength:8'],
  passwordConfirmation: [
    { rule: 'required', message: 'Bananas'},
    { rule: function (val, params, context) {
      if  (val !== this.target.password_digest) {
        throw new Error('Passwords do not Match')
      }
  }, message: 'Passwords do not match'}
]
}

const User = bookshelf.model('User', {
  tableName: 'users',
  initialize () {
    this.on('saving', this.validateSave)
    this.on('saving', (model, attrs, options) => {
      attrs.email = this.attributes.email.toLowerCase()
      return Password.create(attrs.password_digest)
        .then(hash => {
          attrs.password_digest = hash
          delete attrs.password   
          delete attrs.passwordConfirmation
        })
    })
  },
  events () {
    return this.hasMany('Event')
  },
  validateSave () {
    return new Checkit(rules).run(this.attributes)
  }
})

module.exports = User
