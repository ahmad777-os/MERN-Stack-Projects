import express from "express";
import User from "../models/User.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current user info
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Match users
router.get("/match", auth, async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  if (!currentUser || currentUser.role === "admin") {
    return res.status(403).json({ message: "Not allowed" });
  }

  const oppositeRole =
    currentUser.role === "client-worker" ? "client-hirer" : "client-worker";

  const matches = await User.find({
    role: oppositeRole,
    location: currentUser.location,
  }).select("-password");

  res.json(matches);
});

export default router;
