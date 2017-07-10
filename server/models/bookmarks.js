var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookMarkSchema = new Schema({
    title: {
        type: String,
        require: true, 
        index: { 
            unique: true 
        } 
    },
    url: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('BookMark', BookMarkSchema);