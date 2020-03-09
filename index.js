const express = require('express')
const logger = require('morgan')

const app = express();

app.set('view engine','ejs');
app.set('views','views')

app.use(logger('dev'))

app.get('/', (req,res) => {
  // res.send('<h1>Hello World</h1>')
  res.render('hello_world.ejs');
})

app.get('/survey',(req,res) => {
  // res.send('Hello')
  res.render('survey.ejs')
})

app.get('/memes',(req,res) => {
  res.render('memes.ejs', {
    title:'Welcome to My Meme Page',
    memes: [
      "https://www.probytes.net/wp-content/uploads/2018/01/2.jpg",
      "https://www.probytes.net/wp-content/uploads/2018/01/20.png",
      "https://www.probytes.net/wp-content/uploads/2018/01/r_389776_tqMPa-1.jpg",
    ]
  })
})
const PORT = 4000;
const DOMAIN = 'localhost';
app.listen(PORT,DOMAIN, () => {
  console.log(`Server Listening on ${DOMAIN} ${PORT}`)
})