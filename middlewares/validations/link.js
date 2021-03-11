const { body, validationResult } = require('express-validator')
const {validateResponse} = require('../../services/response')

exports.createLinkRules = () => {
    return [
        body('originalLink').trim().not().isEmpty().isURL(),
    ]
}

exports.revertLinkRules = () => {
    return [
        body('shortLink').trim().not().isEmpty().isString().isLength({min:1,max:50}),
    ]
}

exports.createCustomizeLinkRules=()=>{
    return [
        body('originalLink').trim().not().isEmpty().isURL(),
        body('shortLink').trim().not().isEmpty().isString().isLength({min:1,max:50})
    ]
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    
    validateResponse(res, errors)
}


