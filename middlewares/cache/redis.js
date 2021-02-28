const Redis = require('ioredis')
const { wsResponse } = require('../../providers/helpers/response')
const {cache} = require('../../config/database')
const URL = require('url')

var redisUrl = URL.parse(cache.redis.url),redisAuth = redisUrl.auth.split(':');  
const redis = new Redis({
    port: redisUrl.port, // Redis port
    host: redisUrl.hostname, // Redis host
    password: redisAuth[1],
   
  });


    // console.log('redisHost', redisUrl.hostname);
    // console.log('redisPort', redisUrl.port);
    // console.log('redisDb', redisAuth[0]);
    // console.log('redisPass', redisAuth[1]);

const revertLinkCache=async (req, res, next)=>{
    const {shortLink} = req.body
    let result = await redis.get(shortLink)
    if(result){
        result = JSON.parse(result)
        result.message = 'Link found successfully'
        return wsResponse(res, result,'cache')
    }
   
    next()
}

module.exports = {
    revertLinkCache,
    redis
}