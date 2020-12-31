const { MongoClient } = require("mongodb")
const Link = require("../app/models/Link")




const mongoConnect = (callback) => {
    MongoClient.connect("mongodb+srv://admin:1234@cluster0.wjxzh.mongodb.net/littleLink?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
    )
    .then(async client => {
        await Link.injectDB(client)
        console.log('connected to database')
        callback();
        // app.listen(port, () => {
        //     console.log(`listening on port ${port}`)
        // })
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
};

module.exports = mongoConnect;