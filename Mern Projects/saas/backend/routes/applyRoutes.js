import express from "express";
import auth from "../middleware/authMiddleware.js";
import Application from "../models/Application.js";
import Post from "../models/Post.js";

const router = express.Router();

// POST /apply/:postId - Worker applies to a post
router.post("/:postId", auth, async (req, res) => {
  if (req.user.role !== "client-worker") {
    return res.status(403).json({ message: "Only workers can apply to posts" });
  }

  const { postId } = req.params;
  const { message } = req.body;

  try {
    const alreadyApplied = await Application.findOne({
      post: postId,
      worker: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this post" });
    }

    const application = new Application({
      post: postId,
      worker: req.user.id,
      message,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to apply", error: err.message });
  }
});

// GET /applications/post/:postId - Client sees applications on their post
router.get("/post/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post || post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized or post not found" });
    }

    const applications = await Application.find({ post: post._id })
      .populate("worker", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications", error: err.message });
  }
});

export default router;
