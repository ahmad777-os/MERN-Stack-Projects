import Post from "../models/Post.js";

// Add Comment
export const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = { userId: req.user.id, text: req.body.text };
    post.comments.push(newComment);
    await post.save();

    const populatedPost = await post.populate("comments.userId", "username profilePic");
    const addedComment = populatedPost.comments[populatedPost.comments.length - 1];
    res.json(addedComment);
  } catch (err) {
    console.error("Error commenting:", err);
    res.status(500).json({ message: "Error commenting on post" });
  }
};

// Reply to a comment (1st level)
export const replyComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { text } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const newReply = { userId: req.user.id, text };
    comment.replies.push(newReply);
    await post.save();

    const populated = await Post.populate(comment.replies, {
      path: "userId",
      select: "username profilePic",
    });

    res.json(populated[populated.length - 1]);
  } catch (err) {
    console.error("Error replying to comment:", err);
    res.status(500).json({ message: "Error replying to comment" });
  }
};

// Nested reply (reply to a reply of any depth)
export const nestedReplyComment = async (req, res) => {
  try {
    const { id, commentId, replyId } = req.params;
    const { text } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const findNested = (replies, targetId) => {
      for (const reply of replies) {
        if (reply._id.toString() === targetId) return reply;
        const nested = findNested(reply.replies || [], targetId);
        if (nested) return nested;
      }
      return null;
    };

    const targetReply = findNested(comment.replies, replyId);
    if (!targetReply) return res.status(404).json({ message: "Reply not found" });

    const newReply = { userId: req.user.id, text };
    targetReply.replies.push(newReply);

    await post.save();

    const populated = await Post.populate(targetReply.replies, {
      path: "userId",
      select: "username profilePic",
    });

    res.json(populated[populated.length - 1]);
  } catch (err) {
    console.error("Error adding nested reply:", err);
    res.status(500).json({ message: "Error adding nested reply" });
  }
};

// Like / Unlike Comment
export const likeComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const liked = comment.likes.includes(userId);
    liked ? comment.likes.pull(userId) : comment.likes.push(userId);

    await post.save();
    res.json({ liked: !liked, likesCount: comment.likes.length });
  } catch (err) {
    console.error("Error liking comment:", err);
    res.status(500).json({ message: "Error liking comment" });
  }
};

// Like / Unlike Reply (any level)
export const likeReply = async (req, res) => {
  try {
    const { id, commentId, replyId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const findReply = (replies, targetId) => {
      for (const reply of replies) {
        if (reply._id.toString() === targetId) return reply;
        const nested = findReply(reply.replies || [], targetId);
        if (nested) return nested;
      }
      return null;
    };

    const reply = findReply(comment.replies, replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    const liked = reply.likes.includes(userId);
    liked ? reply.likes.pull(userId) : reply.likes.push(userId);

    await post.save();
    res.json({ liked: !liked, likesCount: reply.likes.length });
  } catch (err) {
    console.error("Error liking reply:", err);
    res.status(500).json({ message: "Error liking reply" });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== userId && post.userId.toString() !== userId)
      return res.status(403).json({ message: "Not authorized" });

    comment.deleteOne();
    await post.save();

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};

// Delete Reply (any depth)
export const deleteReply = async (req, res) => {
  try {
    const { id, commentId, replyId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const deleteNested = (replies, targetId) => {
      for (let i = 0; i < replies.length; i++) {
        const reply = replies[i];
        if (reply._id.toString() === targetId) {
          if (reply.userId.toString() !== userId && post.userId.toString() !== userId)
            return { error: "Not authorized" };
          replies.splice(i, 1);
          return { deleted: true };
        }
        const result = deleteNested(reply.replies || [], targetId);
        if (result.deleted || result.error) return result;
      }
      return {};
    };

    const result = deleteNested(comment.replies, replyId);
    if (result.error) return res.status(403).json({ message: result.error });
    if (!result.deleted) return res.status(404).json({ message: "Reply not found" });

    await post.save();
    res.json({ message: "Reply deleted" });
  } catch (err) {
    console.error("Error deleting reply:", err);
    res.status(500).json({ message: "Error deleting reply" });
  }
};
