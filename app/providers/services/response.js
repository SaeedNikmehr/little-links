exports.validateResponse = (res, errors)=>{
    const status = 'error'
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push( [err.param]+ ' : ' + err.msg ))
    res.json({status, message:extractedErrors})
}

exports.modelResponse = (type='insert' , item , extra={})=>{
    if(type === 'insert'){
        if(item._id)
        return {status:"success", message:"inserted successfully", data:extra}
        return {status:"error",message:"insert failed"}
    }
    if(type === 'update'){
        if(item.nModified > 0)
        return {status:"success", message:"updated successfully", data:extra}
        return {status:"error",message:"update failed"}
    }
    if(type === 'find'){
        if(item)
        return {status:"success", message:"item found",data:item}
        return {status:"error",message:"item not found"}
    }
}

exports.wsResponse = (res , result)=>{
    let status = result.status || ''
    let message = [result?.message] 
    let data = result.data || {}
    res.json({status, message, data})
}
