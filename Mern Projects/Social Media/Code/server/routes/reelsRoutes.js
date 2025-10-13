// server/routes/reelRoutes.js
import express from "express";
import { upload } from "../middlewares/multer.js";
import auth from "../middlewares/authMiddleware.js";
import {
  createReel,
  getReels,
  toggleLike,
  addComment,
  addReply,
  deleteReel,
} from "../controllers/reelsController.js";

const router = express.Router();

router.post("/", auth, upload.single("video"), createReel);
router.get("/", auth, getReels);
router.put("/:id/like", auth, toggleLike);
router.post("/:id/comment", auth, addComment);
router.post("/:id/comment/:commentId/reply", auth, addReply);
router.delete("/:id", auth, deleteReel);

export default router;
