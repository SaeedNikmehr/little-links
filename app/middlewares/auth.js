const jwt = require('jsonwebtoken')

exports.authJWT = (req, res, next)=>{
    let token = req.headers.authorization
    if(!token){
        return res.json({
            status:'error',
            message:['authorization token is missing']
        })
    }
   
    token = token.split(' ')[1] || '';
    
    jwt.verify(token, process.env.JWT_SECRET, function(err, user){
        if(err){
            return res.json({
                status:'error',
                message:['token is not valid']
            })
        }
  
        req.user = user
        next()
    })
}