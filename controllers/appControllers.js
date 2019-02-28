const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post
    .find({})
    .then(foundPosts => {
      res.render("index", { posts: foundPosts });
    })
    .catch(err => {
      console.log(err);
    });
}


exports.addPost = (req, res, next) => {
  res.render("newPost");
}

exports.addNewPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl
  }) 
  post
    .save()
    .then(post => console.log(post))
    .catch(err => console.log(err))
  res.redirect("/");
}


exports.showPost = (req, res, next) => {
  Post
    .findById(req.params.postId)
    .then(post => res.render("post", { post: post }))
    .catch(err => console.log(err))
}

exports.editPost = (req, res, next) => {
  Post
    .findById(req.params.postId)
    .then(post => res.render("editPost", { post: post }))
    .catch(err => console.log(err))
}


exports.editSinglePost = (req, res, next) => {
  Post
    .findByIdAndUpdate({ _id: req.params.postId }, req.body, { new: true })
    .then(updatedPost => console.log(updatedPost))
    .catch(err => console.log(err))
  res.redirect("/")
}


exports.deletePost = (req, res, next) => {
  Post 
    .findByIdAndDelete({_id: req.params.postId})
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
}