const { MongoClient } = require("mongodb")
const Link = require("../app/models/Link")
require('dotenv').config()

const port = process.env.PORT || 5000


const mongoConnect = async() => {
    MongoClient.connect(
        process.env.ATLAS_DB,
        { useUnifiedTopology: true }
        )
        .then(async client => {
            await Link.injectDB(client)
            console.log('connected to database')
            // callback();
            // app.listen(port, () => {
            //     console.log(`listening on port ${port}`)
            // })
        })
        .catch(err => {
            console.error(err.stack)
            process.exit(1)
        })
    };
    
    module.exports = {
        mongoConnect,
        port
    };