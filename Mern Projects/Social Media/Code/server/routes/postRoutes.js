import express from "express";
import {
  createPost,
  getAllPosts,
  likePost,
  deletePost,
  addComment,
  deleteComment,
  likeComment,
} from "../controllers/postController.js";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", auth, upload.single("media"), createPost);
router.get("/all", auth, getAllPosts);
router.put("/:id/like", auth, likePost);
router.delete("/:id", auth, deletePost);

router.post("/:postId/comments", auth, addComment);
router.delete("/:postId/comments/:commentId", auth, deleteComment);
router.put("/:postId/comments/:commentId/like", auth, likeComment);

export default router;
