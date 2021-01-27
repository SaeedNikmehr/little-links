const Link = require('../models/Link')

const {wsResponse} = require('../providers/services/response')

exports.createLink = async (req , res , next)=>{
    const {originalLink} = req.body
    let result = await Link.convert(originalLink)
    wsResponse(res , result);
}

exports.revertLink = async(req , res , next)=>{
    const {shortLink} = req.body
    let result = await Link.revert(shortLink)
    wsResponse(res , result);
}
