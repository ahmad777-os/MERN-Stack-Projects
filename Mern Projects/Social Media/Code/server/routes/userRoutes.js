import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getUserProfile);
router.put("/:id", protect, updateUserProfile);
router.put("/follow/:id", protect, followUser);
router.put("/unfollow/:id", protect, unfollowUser);

export default router;
