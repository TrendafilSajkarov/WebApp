const Post = require("../models/post")
const Subcategory = require("../models/subcategory");
const Category = require("../models/category");

exports.getAddCategory = (req, res, next) => {
  Category
    .find()
    .then(result => {
      res.render("./admin/index", {categories: result});
    })
    .catch(err => console.log(err));  
}

exports.postAddCategory = (req, res, next) => {
  const catName = req.body.category;
  if(catName.trim() == ""){
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
    .populate("subcategory")
    .exec()
    .then(result => {
      res.render("./admin/showCategory", {category: result})
    })
    .catch(err => console.log(err));
}

exports.editCategory = (req, res, next) => {
  const newName = req.body.newCategoryName
  Category
    .findByIdAndUpdate(req.params.categoryID, {name: newName}, {new: true})
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
        if(err){
          console.log(err);
        }
        res.redirect("/app/admin");
      })
    })
  })
}

// Subcategories Routes Controllers

exports.postAddSubcategory = (req, res, next) => {
  const subcategory = new Subcategory({
    name: req.body.subcategory
  })
  Category
    .findById(req.params.categoryID)
    .then(category => {
      category.subcategory.push(subcategory);
      subcategory.save();
      category.save();
      res.redirect("/app/admin/" + req.params.categoryID)
    })
    .catch(err => console.log(err));
}

exports.getOneSubcategory = (req, res, next) => {
  Subcategory
    .findById(req.params.subcategoryID).populate("posts")
    .then(result => {
      res.render("./admin/showSubcategory", {
        subcategory: result,
        category: req.params.categoryID
      })
    })
    .catch(err => console.log(err));
}


exports.editSubcategory = (req, res, next) => {
  const category = req.params.categoryID
  const newName = req.body.newSubcategoryName;
  Subcategory
    .findByIdAndUpdate(req.params.subcategoryID, {name: newName}, {new: true})
    .then(result => res.redirect("/app/admin/" + category))
    .catch(err => console.log(err))
}


exports.deleteSubcategory = (req, res, next) => {
  Subcategory.findByIdAndRemove(req.params.subcategoryID, (err, result) => {
    if (err) {
      console.log(err)
    }
    Post.deleteMany({ _id: { $in: result.posts } }, (err) => {
      if(err){
        console.log(err)
      }
      Category.findByIdAndUpdate(req.params.categoryID,
        { $pull: { subcategory: req.params.subcategoryID } },
        { new: true }, (err, updatedCategory) => {
          if(err){
            console.log(err)
          }
          Category.findByIdAndUpdate(req.params.categoryID, 
            { $pull: { subcategoryPosts: { $in: result.posts } } },
             { new:true }, (err, updatedCategory) => {
               if(err){
                 console.log(err)
               }
               res.redirect("/app/admin/" + req.params.categoryID);
             })
        })
    })
  })
}

// exports.deleteCategory = (req, res, next) => {
//   Category.findByIdAndRemove(req.params.categoryID, (err, result) => {
//     if (err) {
//       console.log(err)
//     }
//     Subcategory.deleteMany({ _id: { $in: result.subcategory } }, (err) => {
//       if (err) {
//         console.log(err)
//       }
//       res.redirect("/app/admin")
//     })
//   })
// }


// Subcategories Post Routes Controllers

exports.getNewPostForm = (req, res, next) => {
  const category = req.params.categoryID;
  const subcategory = req.params.subcategoryID;
  res.render("./admin/newPost", {category: category, subcategory: subcategory});
}

exports.postNewPost = (req, res, next) => {
  const categoryID = req.params.categoryID;
  const subcategoryID = req.params.subcategoryID;
  const post = new Post({
    title: req.body.title,
    imageURL: req.body.imageURL,
    content: req.body.content
  })
  Subcategory
    .findById(req.params.subcategoryID)
    .then(subcategory => {
      subcategory.posts.push(post);
      post.save();
      subcategory.save();
    })
    .catch(err => console.log(err));
  Category
    .findById(req.params.categoryID)
    .then(category => {
      category.subcategoryPosts.push(post);
      category.save();
      res.redirect("/app/admin/" + categoryID + "/" + subcategoryID);
    })
    .catch(err => console.log(err));
}


exports.getSinglePost = (req, res, next) => {
  const categoryID = req.params.categoryID;
  const subcategoryID = req.params.subcategoryID;
  Post.findById(req.params.postID)
    .then(result => res.render("./admin/showPost", {
      post: result,
      categoryID: categoryID,
      subcategoryID: subcategoryID
    }))
    .catch(err => console.log(err));
}

exports.getEditPostForm = (req, res, next) => {
  const categoryID = req.params.categoryID;
  const subcategoryID = req.params.subcategoryID;
  Post.findById(req.params.postID)
    .then(result => res.render("./admin/editPost", {
      post: result,
      categoryID: categoryID,
      subcategoryID: subcategoryID      
    }))
    .catch(err => console.log(err))
}

exports.editPost = (req, res, next) => {
  const categoryID = req.params.categoryID;
  const subcategoryID = req.params.subcategoryID;
  Post
    .findByIdAndUpdate(req.params.postID, req.body, { new: true })
    .then(result => {
      res.redirect("/app/admin/" + categoryID + "/" + subcategoryID);
    })
    .catch(err => console.log(err))
}

exports.deletePost = (req, res, next) => {
  Post
    .findByIdAndRemove(req.params.postID, (err, result) => {
      if (err) {
        console.log(err)
      }
      Subcategory
        .findByIdAndUpdate(req.params.subcategoryID,
          { $pull: { posts: req.params.postID } },
          { new: true }, (err, updatedSubcategory) => {
            if (err) {
              console.log(err)
            }
            Category
              .findByIdAndUpdate(req.params.categoryID,
                { $pull: { subcategoryPosts: req.params.postID } },
                { new: true }, (err, updatedCategory) => {
                  if (err) {
                    console.log(err)
                  }
                  res.redirect("/app/admin/" + req.params.categoryID + "/" + req.params.subcategoryID);
                })
          })
    })
}