const express = require('express');

const appController = require('../controllers/appControllers');

const router = express.Router();


router.get("/index", appController.getPosts);

router.get("/post/new", appController.addPost);

router.post("/post", appController.addNewPost);

router.get("/post/:postId", appController.showPost);

router.get("/post/:postId/edit", appController.editPost);

router.put("/post/:postId", appController.editSinglePost);

router.delete("/post/:postId", appController.deletePost);

module.exports = router;