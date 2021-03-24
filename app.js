const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
// const cron = require('node-cron')

const {database} = require('./config/database')
const {port} = require('./config/app')
const {wsResponse} = require('./services/response')
const {swaggerDocs, swaggerUI} = require('./config/swagger')


const app = express();

require('./bootstrap/app')(app)
require('./routes')(app)
app.use((error, req, res, next) => {
  console.log(error);
  const message = error.message;
  wsResponse(res, {message})
});
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// cron.schedule('10 * * * * *',()=>{
//   console.log('cron job is running ... ')
// })



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
  
  