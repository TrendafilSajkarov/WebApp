const mongoose = require('mongoose');
const Post = require("./post");

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    name: String,
    posts: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
    ]
})


module.exports = mongoose.model('Subcategory', subcategorySchema);