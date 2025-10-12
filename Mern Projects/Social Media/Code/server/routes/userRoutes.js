import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";


const router = express.Router();

// 👤 Get a user's profile by ID
router.get("/:id", auth, getUserProfile);

// ✏️ Update a user's profile
router.put("/:id", auth, updateUserProfile);

// ➕ Follow another user
router.put("/follow/:id", auth, followUser);

// ➖ Unfollow a user
router.put("/unfollow/:id", auth, unfollowUser);

export default router;
