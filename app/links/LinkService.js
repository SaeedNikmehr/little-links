const {base62Encode, base62Decode} = require('../../services/base62')

class LinkService{
    
    constructor({Link}){
        this.Link = Link
    }
    
    async convert(originalLink){
        const result = await this.Link.create({originalLink})
        
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
}


module.exports = LinkService