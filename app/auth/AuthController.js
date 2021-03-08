const User = require('../users/UserModel')
const AuthService = require('./AuthService')
const AuthServiceInstance = new AuthService({User})

const {wsResponse} = require('../../services/response')

exports.register =async (req, res, next)=>{
    const {name , email , password} = req.body;
    const result = await AuthServiceInstance.register({name , email , password})
    wsResponse(res, result)
}

exports.login =async (req, res, next)=>{
    const {email, password} = req.body
    const result = await AuthServiceInstance.login({email, password})
    wsResponse(res, result)
}