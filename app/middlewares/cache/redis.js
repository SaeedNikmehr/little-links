const Redis = require('ioredis')
const { wsResponse } = require('../../providers/services/response')

const redis = new Redis({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_URL, 
});

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