const express = require('express')
const logger = require('morgan')
// const knex = require('./db/client')
const eventsRouter = require('./routes/events')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))

app.use('/events', eventsRouter)

app.get('/', (req, res) => {
  res.render('hello_world.ejs')
})

app.get('/survey', (req, res) => {
  res.render('survey.ejs')
})

app.post('/survey', (req, res) => {
  console.log(req.body)
  res.send('Thank you')
})

app.get('/memes', (req, res) => {
  res.render('memes.ejs', {
    title: 'Welcome to My Meme Page',
    memes: [
      'https://www.probytes.net/wp-content/uploads/2018/01/2.jpg',
      'https://www.probytes.net/wp-content/uploads/2018/01/20.png',
      'https://www.probytes.net/wp-content/uploads/2018/01/r_389776_tqMPa-1.jpg'
    ]
  })
})

const PORT = 4000
const DOMAIN = 'localhost'

app.listen(PORT, DOMAIN, () => {
  console.log(`Server Listening on ${DOMAIN}:${PORT}`)
})
