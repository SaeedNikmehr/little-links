const User = require('../models/User')

const {wsResponse} = require('../providers/services/response')

exports.register =async (req, res, next)=>{
    const {name , email , password} = req.body;
    const user  = new User({name , email , password})
    const result =await  user.register()
    wsResponse(res, result)
}

exports.login =async (req, res, next)=>{
    const {email, password} = req.body
    const result = await User.login({email, password})
    wsResponse(res, result)
}