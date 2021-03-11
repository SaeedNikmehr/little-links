const Link = require('./LinkModel')
const User = require('../users/UserModel')
const LinkService = require('./LinkService')
const LinkServiceInstance = new LinkService({Link, User})


const {wsResponse} = require('../../services/response')

exports.createLink = async (req , res , next)=>{
    const userId = req.user?.id
    const {originalLink} = req.body
    let result = await LinkServiceInstance.convert({originalLink, userId})
    wsResponse(res , result);
}

exports.revertLink = async(req , res , next)=>{
    const {shortLink} = req.body
    let result = await LinkServiceInstance.revert(shortLink)
    wsResponse(res , result);
}

exports.createCustomizeLink=async(req, res)=>{
    const userId = req.user.id
    const {shortLink, originalLink} = req.body
    let result = await LinkServiceInstance.createCustomizeLink({shortLink, originalLink, userId})
    wsResponse(res , result);
}

exports.test = async (req, res, next)=>{
    const r =await  Link.find().populate('user')
    res.send(r)
    // console.log(r.getFilter())
}
