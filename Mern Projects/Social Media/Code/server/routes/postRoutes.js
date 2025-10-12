import express from "express";
import { createPost, getAllPosts, likePost, deletePost } from "../controllers/postController.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", auth, upload.single("media"), createPost);
router.get("/all", getAllPosts);
router.put("/:id/like", auth, likePost);
router.delete("/:id", auth, deletePost);

export default router;
