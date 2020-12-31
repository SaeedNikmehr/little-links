const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const mongoConnect = require('./config/database')

const app = express();









const port = process.env.PORT || 5000
mongoConnect(() => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
  });
  