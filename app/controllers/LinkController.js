const Link = require('../models/Link')
const base = require('./BaseController')

exports.createLink = async (req , res , next)=>{
    const {originalLink} = req.body
    let result = await Link.convert(originalLink)
    base.wsResponse(res , result);
}

exports.revertLink = async(req , res , next)=>{
    const {shortLink} = req.body
    let result = await Link.revert(shortLink)
    base.wsResponse(res , result);
}
