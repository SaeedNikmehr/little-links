let urls;

class Link {
    static async injectDB(conn) {
        if (urls) {
            return
        }
        
        urls = await conn.db(process.env.MFLIX_NS).collection("urls")
        
    }
}
module.exports = Link;