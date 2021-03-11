exports.validateResponse = (res, errors)=>{
    const status = 'error'
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push( [err.param]+ ' : ' + err.msg ))
    res.json({status, message:extractedErrors})
}


exports.wsResponse = (res, result)=>{
    let status = result.status || ''
    let message = [result?.message] 
    if(result.data){
        let data = result.data || {}
        return res.json({status, message, data})
    }
    return res.json({status, message})
}
