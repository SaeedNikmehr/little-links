const {base62Encode, base62Decode} = require('../../services/base62')

class LinkService{
    
    constructor({Link, User}){
        this.Link = Link
        this.User = User
    }
    
    async convert({originalLink, userId}){
        let insert = {originalLink}
        if(userId)
        insert.user=userId
        
        const result = await this.Link.create(insert)
        const shortLink = await base62Encode(result.counter)
        const updated = await this.Link.updateOne({counter:result.counter}, { shortLink })
        const data = 
        {
            _id:result._id,
            shortLink, 
            originalLink,
            expireDate:result.expireDate,
            views:result.views
        }

        if(userId){
            await this.addToUserLinks({userId, linkId: result._id})
        }
        
        if(updated.nModified > 0)
        return {status:"success", message:"link created successfully!", data}
        return {status:"error", message:"link creation failed !"}
        
    }
    
    
    async revert(shortLink){
        const counter = await base62Decode(shortLink)
        const result = await this.Link.findOne({counter},'shortLink originalLink views expireDate').cache()
        
        if(result)
        return {status:"success", message:"link found successfully",data:result}
        return {status:"error",message:"link does not exists"}
    }
    
    
    async createCustomizeLink({shortLink, originalLink, userId}){
        const result = await this.Link.findOne({shortLink})
        if(result)
        return {status:"error", message:"This url already exists, Pick another one"}
        
        const createLink = await this.Link.create({shortLink, originalLink, userId})
        const data = 
        {
            _id:createLink._id,
            shortLink, 
            originalLink,
            expireDate:createLink.expireDate,
            views:createLink.views
        }

        await this.addToUserLinks({userId, linkId: createLink._id})

        return {status:"success", message:"link created successfully!", data}
    }

    async addToUserLinks({userId, linkId}){
        const user = await  this.User.findOne({_id:userId})
        user.links.push(linkId)
        user.save()
        return
    }
    
}


module.exports = LinkService