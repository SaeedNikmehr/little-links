const Link = require('../models/Link')
const base = require('./BaseController')

exports.createLink = async (req , res , next)=>{
    const {link} = req.body
    let shortLink = '123'
    let result = await Link.create({
        link , shortLink
    })
    base.response(res);
}