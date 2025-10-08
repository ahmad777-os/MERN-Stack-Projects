const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

const router = express.Router();

// Add comment (protected)
router.post("/", auth, async (req, res) => {
  try {
    const comment = new Comment({
      post: req.body.post,
      user: req.user.id, 
      content: req.body.content,
    });
    await comment.save();
    const populatedComment = await comment.populate("user", "username");
    res.json(populatedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username");
  res.json(comments);
});

module.exports = router;
