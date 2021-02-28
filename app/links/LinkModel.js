const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Link', linkSchema);

