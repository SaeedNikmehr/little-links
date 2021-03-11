const User = require('./UserModel')
const UserService = require('./UserService')
const UserServiceInstance = new UserService({User})


const {wsResponse} = require('../../services/response')

exports.links = async (req , res , next)=>{
    const userId = req.user.id
    let result = await UserServiceInstance.links({userId})
    wsResponse(res , result);
}


