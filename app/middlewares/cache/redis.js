const Redis = require('ioredis')
const { wsResponse } = require('../../providers/services/response')
const {cache} = require('../../../config/database')
const URL = require('url')

var redisUrl = URL.parse(cache.redis.url),redisAuth = redisUrl.auth.split(':');  
const redis = new Redis({
    port: redisUrl.port, // Redis port
    host: redisUrl.hostname, // Redis host
    password: redisAuth[1],
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