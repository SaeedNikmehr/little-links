const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {modelResponse} = require('../providers/services/response')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required:true},
    email: { type: String, required:true},
    password: {type: String, required:true},
},{timestamps:true});

userSchema.methods.register = async function(){
    this.password = await bcrypt.hash(this.password, 13)
    const newUser = await this.save()
    const extra =  {_id:newUser._id , name:newUser.name ,email:newUser.email}
    return modelResponse('insert', newUser ,extra) 
}

userSchema.statics.login = async function(data){
    const user = await this.findOne({email:data.email})
    if (!user) return modelResponse('find', user ) 
    const result = await bcrypt.compare(data.password, user.password);
    if(!result) return {status : 'error',message:'username or password is wrong'}

    const token = jwt.sign(
        {  id: user._id , name : user.name ,  email : user.email}
         , process.env.JWT_SECRET, {expiresIn: "24h"});
        
        return {status : 'success',message:'logged in successfully',data:{ token }}
}



module.exports = mongoose.model('User', userSchema);