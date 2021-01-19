const linkRouter = require('./link')

module.exports = (app)=>{
    app.use('/',linkRouter);
}