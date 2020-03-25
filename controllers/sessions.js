module.exports = {
  new: (req, res) => {
    res.render('sessions/new')
  },
  create: (res, req) => {
    res.send('Sessions Create')
  }
}
