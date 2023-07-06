const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating new instance of Schema object
const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    snippet : {
        type : String,
        required : true
    },
    body : {
        type: String,
        required : true
    }
} , { timestamps: true});

const Blog = mongoose.model('Blog', blogSchema ) //Blog is name given to blogs connection
module.exports = Blog;
