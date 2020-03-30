const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

module.exports = class Password {
  static create (password) {
    return bcrypt.hash(password, SALT_ROUNDS)
      .then(hash => {
        return hash
      })
  }

  static compare (password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, same) => {
        if (err) {
          reject(err)
        }
        resolve(same)
      })
    })
  }
}
