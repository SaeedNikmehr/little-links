const Link = require('./LinkModel')
const LinkService = require('./LinkService')
const LinkServiceInstance = new LinkService({Link})


const {wsResponse} = require('../../providers/helpers/response')

exports.createLink = async (req , res , next)=>{
    const {originalLink} = req.body
    let result = await LinkServiceInstance.convert(originalLink)
    if(result.status === "success"){

        const {status, data} = result

        LinkServiceInstance.addToRedis({
            key : result.data.shortLink,
            value : JSON.stringify({status, data}),
            expireTime : 3600
        })
    }
    wsResponse(res , result);
}

exports.revertLink = async(req , res , next)=>{
    const {shortLink} = req.body
    let result = await LinkServiceInstance.revert(shortLink)
    wsResponse(res , result);
}
