module.exports = {
  new: (req, res) => {
    res.render('sessions/new')
  },
  create: (req, res) => {
    req.session.hello = 'world'
    res.send('Sessions Create')
  }
}
