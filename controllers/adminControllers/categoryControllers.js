const Post = require("../../models/post")
const Subcategory = require("../../models/subcategory");
const Category = require("../../models/category");

// Category Controllers

exports.getAddCategory = (req, res, next) => {
  Category
    .find()
    .then(result => {
      res.render("./admin/index", { categories: result });
    })
    .catch(err => console.log(err));
}

exports.postAddCategory = (req, res, next) => {
  const catName = req.body.category;
  if (catName.trim() == "") {
    console.log("Category can't be blanc");
  } else {
    const category = new Category({
      name: req.body.category
    })
    category
      .save()
      .then(result => {
        res.redirect("/app/admin");
      })
      .catch(err => console.log(err));
  }
}

exports.getOneCategory = (req, res, next) => {
  Category
    .findById(req.params.categoryID)
    .populate([{
      path: "subcategory",
      model: "Subcategory"
    }, {
      path: "posts",
      model: "Post"
    }])
    .exec()
    .then(result => {
      res.render("./admin/showCategory", { category: result })
    })
    .catch(err => console.log(err));
}

exports.editCategory = (req, res, next) => {
  const newName = req.body.newCategoryName
  Category
    .findByIdAndUpdate(req.params.categoryID, { name: newName }, { new: true })
    .then(result => res.redirect("/app/admin"))
    .catch(err => console.log(err));
}

exports.deleteCategory = (req, res, next) => {
  Category.findByIdAndRemove(req.params.categoryID, (err, result) => {
    if (err) {
      console.log(err)
    }
    Subcategory.deleteMany({ _id: { $in: result.subcategory } }, (err) => {
      if (err) {
        console.log(err)
      }
      Post.deleteMany({ _id: { $in: result.subcategoryPosts } }, (err) => {
        if (err) {
          console.log(err);
        }
        Post.deleteMany({ _id: { $in: result.posts } }, (err) => {
          if (err) {
            console.log(err);
          }
          res.redirect("/app/admin");
        })
      })
    })
  })
}

// Categories Post Routes Controllers

exports.getNewCatPostForm = (req, res, next) => {
  Category
    .findById(req.params.categoryID)
    .then(result => {
      res.render("./admin/newCatPost", {
        category: result,
      });
    })
}

exports.postNewCatPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imageURL: req.body.imageURL
  })
  Category
    .findById(req.params.categoryID)
    .then(category => {
      post.save();
      category.posts.push(post);
      category.save();
      res.redirect("/app/admin/" + req.params.categoryID);
    })
    .catch(err => console.log(err));
}

exports.getSingleCatPost = (req, res, next) => {
  Post
    .findById(req.params.postID)
    .then(result => res.render("admin/showCatPost", { post: result, categoryID: req.params.categoryID }));
}

exports.getEditCatPostForm = (req, res, next) => {
  Post
    .findById(req.params.postID)
    .then(result => res.render("admin/editCatPost", {
      post: result,
      categoryID: req.params.categoryID,
      postID: req.params.postID
    }))
}

exports.editCatPost = (req, res, next) => {
  Post
    .findByIdAndUpdate(req.params.postID, req.body, { new: true })
    .then(result => res.redirect("/app/admin/" + req.params.categoryID + "/" + req.params.postID))
    .catch(err => console.log(err));
}

exports.deleteCatPost = (req, res, next) => {
  Post
    .findByIdAndRemove(req.params.postID, (err, result) => {
      if (err) {
        console.log(err)
      }
      Category
        .findByIdAndUpdate(req.params.categoryID,
          { $pull: { posts: req.params.postID } },
          { new: true }, (err, updatedCategory) => {
            if (err) {
              console.log(err);
            }
            res.redirect("/app/admin/" + req.params.categoryID);
          })
    })
}