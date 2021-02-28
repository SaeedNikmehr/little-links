const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService{
    
    constructor({User}){
        this.User = User
    }
    
    async register({name , email , password}){
        password = await bcrypt.hash(password, 13)
        const user  = new this.User({name , email , password})
        const newUser = await user.save()
        
        if(newUser._id){
            const {_id , name ,email} =  newUser
            return {status:"success", message:"User registered successfully", data:{_id , name ,email}}
        }
        return {status:"error",message:"User registration failed"}
    }
    
     async login({email , password}){
        const user = await this.User.findOne({email})
        if (!user) 
        return {status:"error",message:"There is no user registered with this email"}

        const result = await bcrypt.compare(password, user.password);
        if(!result) 
        return {status : 'error',message:'username or password is wrong'}
    
        const token = jwt.sign(
            {  id: user._id , name : user.name ,  email : user.email}
             , process.env.JWT_SECRET, {expiresIn: "24h"});
            
            return {status : 'success',message:'logged in successfully',data:{ token }}
    }
    
}


module.exports = AuthService