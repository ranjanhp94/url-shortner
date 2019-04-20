const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const sh = require('shorthash');

const urlSchema = new Schema({
    title: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 64
    },
    original_url: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value){
                    return validator.isURL(value);
            },
            message: function() {
                return 'invalid url format'
            }
        }
    },
    tags: {
        type: [String],
        required: true
    },
    hashedUrl: {
        type: String
    },
    createdAt: { type: Date, default: Date.now },
    clicks: [{
            createdAt: { type: Date, default: Date.now },
            ip_address: String,
            browser_name: String,
            os_type: String,
            device_type: String
        }]
});

urlSchema.pre('save', function(next){
    let url = this;
    let hashed = sh.unique(url.original_url);
    url.hashedUrl = hashed;
    next();
})


const Url = mongoose.model('Url', urlSchema);

module.exports = {
    Url
}