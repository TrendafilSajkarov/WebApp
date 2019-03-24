const mongoose = require('mongoose');
const Post = require("./post");
const Subcategory = require("./subcategory");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    subcategory: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Subcategory"}
    ],
    subcategoryPosts: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
    ],
    posts: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
    ]
});


module.exports = mongoose.model('Category', categorySchema);