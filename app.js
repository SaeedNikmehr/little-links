const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const {mongoConnect , port} = require('./config/database')

const app = express();









mongoConnect().then(()=>{
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
});
  