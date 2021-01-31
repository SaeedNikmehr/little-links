const linkRouter = require('./link')
const authRouter = require('./auth')

module.exports = (app)=>{
    app.use('/links',linkRouter);
    app.use('/auth',authRouter);
}