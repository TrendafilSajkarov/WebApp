const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminControllers/subcategoryControllers");

// Subcategories Routes

router.post("/:categoryID/subcategory/new", adminController.postAddSubcategory);

router.get("/:categoryID/subcategory/:subcategoryID", adminController.getOneSubcategory);

router.put("/:categoryID/subcategory/:subcategoryID", adminController.editSubcategory);

router.delete("/:categoryID/subcategory/:subcategoryID", adminController.deleteSubcategory);

//  - Subcategory Posts Routes

router.get("/:categoryID/subcategory/:subcategoryID/newpost", adminController.getNewPostForm);

router.post("/:categoryID/subcategory/:subcategoryID/newpost", adminController.postNewPost);

router.get("/:categoryID/subcategory/:subcategoryID/:postID", adminController.getSinglePost);

router.get("/:categoryID/subcategory/:subcategoryID/:postID/edit", adminController.getEditPostForm);

router.put("/:categoryID/subcategory/:subcategoryID/:postID", adminController.editPost);

router.delete("/:categoryID/subcategory/:subcategoryID/:postID", adminController.deletePost);

module.exports = router 