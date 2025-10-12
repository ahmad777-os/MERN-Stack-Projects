import Post from "../models/Post.js";

// Create Post (image or video)
export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    const newPost = new Post({
      userId: req.user.id,
      caption,
    });

    if (file) {
      if (file.mimetype.startsWith("video/")) newPost.videoUrl = file.path;
      else newPost.imageUrl = file.path;
    }

    const savedPost = await newPost.save();
    const populated = await savedPost.populate("userId", "username profilePic");
    res.json(populated);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Get All Public Posts (with pagination)
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("userId", "username profilePic")
      .populate({
        path: "comments.userId",
        select: "username profilePic",
      })
      .populate({
        path: "comments.replies.userId",
        select: "username profilePic",
      })
      .populate({
        path: "comments.replies.replies.userId",
        select: "username profilePic",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// Like / Unlike Post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;

    if (!post) return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(userId);
    if (liked) post.likes.pull(userId);
    else post.likes.push(userId);

    await post.save();
    res.json({ liked: !liked, likesCount: post.likes.length });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ message: "Error liking post" });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Error deleting post" });
  }
};
