exports.validateResponse = (res, errors)=>{
    const status = 'error'
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push( [err.param]+ ' : ' + err.msg ))
    res.status(400).json({status, message:extractedErrors})
}


exports.wsResponse = (res, result)=>{
    let status = result.status || 'error'
    let message = [result?.message] 
    if(result.data){
        let data = result.data || {}
        return res.json({status, message, data})
    }
    return res.json({status, message})
}
