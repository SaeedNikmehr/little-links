const { response } = require('express');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const {modelResponse} = require('../providers/services/response')

const Schema = mongoose.Schema;
const charset= '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
autoIncrement.initialize(mongoose);

const linkSchema = new Schema({
    originalLink: { type: String, required: true},
    shortLink: { type: String, default: ''},
    views: {type: Number,default: 0},
    counter: {type: Number,required: true},
    createdAt: { type: Date, default: Date.now },
    expireDate:{ type: Date, default: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) },
});

linkSchema.plugin(autoIncrement.plugin, { model: 'Link', field: 'counter' });

linkSchema.statics.convert = async function(originalLink){
    const result = await this.create({originalLink})
    const shortLink = await base62Encode(result.counter)
    const updated = await this.updateOne({counter:result.counter}, { shortLink })
    return modelResponse('update', updated, result)
}


linkSchema.statics.revert = async function(shortLink){
    const counter = await base62Decode(shortLink)
    const result = await this.findOne({counter},'shortLink originalLink views')
    return modelResponse('find',result)
}

module.exports = mongoose.model('Link', linkSchema);

base62Encode = async(number)=>{
    if (number < 0) return '';
    number = parseInt(number);
    let str = [];
    while (number > 0) {
        str = [charset[number % 62], ...str];
        number = Math.floor(number / 62);
    }
    return str.join('');
}

base62Decode = async(chars)=>{
    let counter = chars.split('').reverse().reduce((prev, curr, i) =>
    prev + (charset.indexOf(curr) * (62 ** i)), 0)
    return counter
}

