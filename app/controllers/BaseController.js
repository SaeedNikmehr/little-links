
exports.wsResponse = (res , result)=>{
    let status = result.status
    let message = [result.message]
    let data = result.data || {}
    res.json({status, message, data})
}
