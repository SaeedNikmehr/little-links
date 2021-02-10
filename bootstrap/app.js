//initiation packages and setting

const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')

module.exports = (app)=>{
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use(cors())
    app.use(helmet())
    

}