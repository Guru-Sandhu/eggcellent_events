const express = require('express')

const app = express();

app.get('/', (req,res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/survey',(req,res) => {
  res.send('Hello')
})

const PORT = 4000;
const DOMAIN = 'localhost';
app.listen(PORT,DOMAIN, () => {
  console.log(`Server Listening on ${DOMAIN} ${PORT}`)
})