const Link = require('./LinkModel')
const LinkService = require('./LinkService')
const LinkServiceInstance = new LinkService({Link})


const {wsResponse} = require('../../services/response')

exports.createLink = async (req , res , next)=>{
    const {originalLink} = req.body
    let result = await LinkServiceInstance.convert(originalLink)
    if(result.status === "success"){
        const {status, data} = result
    }
    wsResponse(res , result);
}

exports.revertLink = async(req , res , next)=>{
    const {shortLink} = req.body
    let result = await LinkServiceInstance.revert(shortLink)
    wsResponse(res , result);
}

exports.test = async (req, res, next)=>{
    const r =await  Link.find({shortLink:1}).where('originalLink').equals('Ghost').limit(10)
    // console.log(r.getFilter())
}
