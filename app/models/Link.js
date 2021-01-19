const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema(
    {
        link: {
            type: String,
            required: true
        },
        shortLink: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
    );
    
    module.exports = mongoose.model('Link', linkSchema);
    