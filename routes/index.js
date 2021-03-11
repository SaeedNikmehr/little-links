const linkRouter = require('./link')
const authRouter = require('./auth')
const userRouter = require('./user')

module.exports = (app)=>{
    app.use('/links',linkRouter);
    app.use('/auth',authRouter);
    app.use('/users',userRouter);
}