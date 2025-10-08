const express = require("express");
const Post = require("../model/Post");
const router = express.Router();

// Step 1: Get data from request body
// Step 2: Create new post with that data
// Step 3: Save post to DB
// Step 4: Send response back

// CREATE Post
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all posts with pagination
router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query;
    page = Number(page);
    limit = Number(limit);
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "username email");
    const totalPosts = await Post.countDocuments();
    res.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      posts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like Post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      post.likes.push(req.body.userId);
      await post.save();
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unlike Post
router.put("/:id/unlike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes = post.likes.filter((id) => id.toString() !== req.body.userId);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
