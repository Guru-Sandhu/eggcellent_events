const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

module.exports = class Password {
  static create (password) {
    return bcrypt.hash(password, SALT_ROUNDS)
      .then(hash => {
        return hash
      })
  }
}