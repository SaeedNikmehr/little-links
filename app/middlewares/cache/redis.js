const Redis = require('ioredis')
const { wsResponse } = require('../../providers/services/response')
const {cache} = require('../../../config/database')

const redis = new Redis(cache.redis.url);

const revertLinkCache=async (req, res, next)=>{
    const {shortLink} = req.body
    const result = await redis.get(shortLink)
    if(result)
    return wsResponse(res, JSON.parse(result),'cache')
    next()
}

module.exports = {
    revertLinkCache,
    redis
}