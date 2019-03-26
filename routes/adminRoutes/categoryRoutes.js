const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminControllers/categoryControllers");

router.get("/", adminController.getAddCategory);

router.post("/category/new", adminController.postAddCategory);

router.get("/:categoryID", adminController.getOneCategory);

router.put("/:categoryID", adminController.editCategory);

router.delete("/:categoryID", adminController.deleteCategory);

//  - Category Posts Routes

router.get("/:categoryID/newpost", adminController.getNewCatPostForm);

router.post("/:categoryID/newpost", adminController.postNewCatPost);

router.get("/:categoryID/:postID", adminController.getSingleCatPost);

router.get("/:categoryID/:postID/edit", adminController.getEditCatPostForm);

router.put("/:categoryID/:postID", adminController.editCatPost);

router.delete("/:categoryID/:postID", adminController.deleteCatPost);


module.exports = router 