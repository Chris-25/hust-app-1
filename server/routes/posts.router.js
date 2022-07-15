import express from "express";

import postController from "../controllers/posts.controller.js";

const {
	getPosts,
	getPostByQuery,
	getPostsByCreator,
	getPost,
	createPost,
	updatePost,
	likePost,
	commentPost,
	deletePost,
	getAllPosts,
} = postController;
const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/creator", getPostsByCreator);
router.get("/search", getPostByQuery);
router.get("/", getPosts);
router.get("/all", getAllPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", commentPost);

export default router;
