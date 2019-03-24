const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

router.get("/", adminController.getAddCategory);

router.post("/category/new", adminController.postAddCategory);

router.get("/:categoryID", adminController.getOneCategory);

router.put("/:categoryID", adminController.editCategory);

router.delete("/:categoryID", adminController.deleteCategory);

// Subcategories Routes

router.post("/:categoryID/subcategory/new", adminController.postAddSubcategory);

router.get("/:categoryID/:subcategoryID", adminController.getOneSubcategory);

router.put("/:categoryID/:subcategoryID", adminController.editSubcategory);

router.delete("/:categoryID/:subcategoryID", adminController.deleteSubcategory);

// Post Routes

router.get("/:categoryID/:subcategoryID/newpost", adminController.getNewPostForm);

router.post("/:categoryID/:subcategoryID/newpost", adminController.postNewPost);

router.get("/:categoryID/:subcategoryID/:postID", adminController.getSinglePost);

router.get("/:categoryID/:subcategoryID/:postID/edit", adminController.getEditPostForm);

router.put("/:categoryID/:subcategoryID/:postID", adminController.editPost);

router.delete("/:categoryID/:subcategoryID/:postID", adminController.deletePost);


module.exports = router