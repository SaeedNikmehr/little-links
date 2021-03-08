const mongoose = require('mongoose')
const Redis = require('redis')
const {cache} = require('../config/database')
const {promisify} = require('util')

const redis =  Redis.createClient(cache.redis.url);
redis.hget = promisify(redis.hget)
redis.on("error", function(error) {
    console.error(error);
});

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function(options={}){
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || 'default');
    this.hashEX = JSON.stringify(options.EX || 60);
    return this;
}

mongoose.Query.prototype.exec = async function()
{
    if(!this.useCache)
    return exec.apply(this, arguments);

    const key = JSON.stringify(Object.assign({}, this.getFilter(), 
    {collection : this.mongooseCollection.name},
    {options : this.getOptions()}))
    
    const cacheValue = await redis.hget(this.hashKey, key)
    
    if(cacheValue){
        const documents = JSON.parse(cacheValue)
        return Array.isArray(documents) 
        ? documents.map(document=>new this.model(document))
        : new this.model(documents);
    }
    
    const result = await exec.apply(this, arguments);

    if(result)
    redis.hmset(this.hashKey, key, JSON.stringify(result), 'EX', this.hashEX)
    
    return result;
}