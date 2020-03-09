const express = require('express')

const app = express();

const PORT = 4000;
const DOMAIN = 'localhost';

app.listen(PORT,DOMAIN, () => {
  console.log(`Server Listening on ${DOMAIN} ${PORT}`)
})