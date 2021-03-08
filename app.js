const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const {database} = require('./config/database')
const {port} = require('./config/app')



const app = express();

require('./bootstrap/app')(app)
require('./routes')(app)
app.use('/public', express.static(path.join(__dirname, 'public')));





//connect to db and run server
mongoose.connect(database.mongodb.url+database.mongodb.database+'?authSource=admin',
  { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false
  })
  .then(result => {
    console.log(`connected to database`)
    
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    });
  })
  .catch(err => console.log(err));
  
  