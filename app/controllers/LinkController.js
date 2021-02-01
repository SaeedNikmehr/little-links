const Link = require('../models/Link')

const {redis} = require('../middlewares/cache/redis')

const {wsResponse} = require('../providers/services/response')

exports.createLink = async (req , res , next)=>{
    const {originalLink} = req.body
    let result = await Link.convert(originalLink)
    if(result.status === "success"){
        redis.set(result.data.shortLink, JSON.stringify(result), 'ex', 3600)
    }
    wsResponse(res , result);
}

exports.revertLink = async(req , res , next)=>{
    const {shortLink} = req.body
    let result = await Link.revert(shortLink)
    wsResponse(res , result);
}
