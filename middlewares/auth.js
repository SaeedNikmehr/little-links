const jwt = require('jsonwebtoken')

exports.authJWT = function(isRequired = true){
    
    return function(req, res, next){
        let token = req.headers.authorization || ''
        if(!token && isRequired == true){
            const error = new Error('authorization token is missing');
            throw error
        }
        
        token = token.split(' ')[1] || '';
        
        jwt.verify(token, process.env.JWT_SECRET, function(err, user){
            if(err && isRequired == true){
                const error = new Error('token is not valid');
                throw error
            }
            req.user = user || null
        })
        next()
    }
    
}