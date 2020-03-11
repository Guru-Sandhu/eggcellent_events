function noMonkey (req, res, next) {
  const inputs = Object.keys(req.body)
  let foundMonkey = false
  inputs.forEach(input => {
    if (req.body[input.includes('monkey')]) {
      foundMonkey = true
    }
  })
  if (foundMonkey) {
    return res.send('No Monkey')
  }
  next()
}

module.exports = noMonkey
