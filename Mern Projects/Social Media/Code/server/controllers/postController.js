import Post from "../models/Post.js";
import User from "../models/User.js";

function findComment(comments, commentId) {
  for (let comment of comments) {
    if (comment._id.toString() === commentId.toString()) return comment;
    const found = findComment(comment.replies, commentId);
    if (found) return found;
  }
  return null;
}

function removeComment(comments, commentId, userId) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i]._id.toString() === commentId.toString()) {
      if (comments[i].userId.toString() !== userId.toString()) return false;
      comments.splice(i, 1);
      return true;
    }
    if (removeComment(comments[i].replies, commentId, userId)) return true;
  }
  return false;
}

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;
    const newPost = new Post({ userId: req.user.id, caption });
    if (file) {
      if (file.mimetype.startsWith("video/")) newPost.videoUrl = file.path;
      else newPost.imageUrl = file.path;
    }
    const savedPost = await newPost.save();
    const populated = await savedPost.populate("userId", "username profilePic");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

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
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

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
    res.status(500).json({ message: "Error liking post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text, parentCommentId } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    let targetArray = post.comments;
    if (parentCommentId) {
      const parent = findComment(post.comments, parentCommentId);
      if (!parent) return res.status(404).json({ message: "Parent comment not found" });
      targetArray = parent.replies;
    }
    const newCommentObj = { userId: req.user.id, text, likes: [], replies: [] };
    targetArray.push(newCommentObj);
    const addedComment = targetArray[targetArray.length - 1];
    await post.save();
    const populatedComment = {
      ...addedComment.toObject(),
      userId: {
        _id: req.user._id,
        username: req.user.username,
        profilePic: req.user.profilePic,
      },
    };
    res.json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const removed = removeComment(post.comments, req.params.commentId, req.user.id);
    if (!removed)
      return res.status(403).json({ message: "Comment not found or unauthorized" });
    await post.save();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};

export const likeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comment = findComment(post.comments, req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    const userId = req.user.id;
    const liked = comment.likes.some((id) => id.toString() === userId.toString());
    if (liked)
      comment.likes = comment.likes.filter((id) => id.toString() !== userId.toString());
    else comment.likes.push(userId);
    await post.save();
    res.json({ liked: !liked, likesCount: comment.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Failed to like comment" });
  }
};
