import express from "express";
import auth from "../middlewares/authMiddleware.js";
import {
  commentPost,
  replyComment,
  nestedReplyComment,
  likeComment,
  likeReply,
  deleteComment,
  deleteReply,
} from "../controllers/commentController.js";

const router = express.Router();

// Comments
router.put("/:id/comment", auth, commentPost);
router.put("/:id/comment/:commentId/reply", auth, replyComment);
router.put("/:id/comment/:commentId/like", auth, likeComment);
router.delete("/:id/comment/:commentId", auth, deleteComment);

// Replies
router.put("/:id/comment/:commentId/reply/:replyId/reply", auth, nestedReplyComment);
router.put("/:id/comment/:commentId/reply/:replyId/like", auth, likeReply);
router.delete("/:id/comment/:commentId/reply/:replyId", auth, deleteReply);

export default router;
