import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
  searchUsers, 
  getSuggestions,
} from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/search", searchUsers); 
router.get("/:id", auth, getUserProfile);
router.put("/:id", auth, updateUserProfile);
router.put("/follow/:id", auth, followUser);
router.put("/unfollow/:id", auth, unfollowUser);
router.get("/suggestions/:userId", getSuggestions);
export default router;
