// server/routes/reelsRoutes.js
import express from "express";
import { upload } from "../middlewares/multer.js";
import { createReel, getReels, toggleLike, addComment } from "../controllers/reelsController.js";
import auth from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/", auth, upload.single("video"), createReel);
router.get("/", auth, getReels);
router.put("/:id/like", auth, toggleLike);
router.post("/:id/comment", auth, addComment);

export default router;
