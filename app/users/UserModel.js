const mongoose = require('mongoose');
//const Link = require('../links/LinkModel')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required:true},
    email: { type: String, required:true},
    password: {type: String, required:true},
    links: [{
        type: Schema.Types.ObjectId,
        ref: 'Link'
    }]
},{timestamps:true});


module.exports = mongoose.model('User', userSchema);