exports.validateResponse = (res, errors)=>{
    const status = 'error'
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push( [err.param]+ ' : ' + err.msg ))
    res.json({status, message:extractedErrors})
}


exports.wsResponse = (res, result, source='api')=>{
    let status = result.status || ''
    let message = [result?.message] 
    let data = result.data || {}
    res.json({status, message, data, source})
}
