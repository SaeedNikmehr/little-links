
class UserService{
    
    constructor({User}){
        this.User = User
    }
    
    async links({userId}){
        const result = await this.User.find({_id:userId}).select('links -_id')
        .populate('links', 'shortLink views expireDate _id originalLink')
        
        return {status:"success", message:"Search Completed successfully!", data:result[0].links} 
    }
    
    
}


module.exports = UserService