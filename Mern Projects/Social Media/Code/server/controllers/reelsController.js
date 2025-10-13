// server/controllers/reelsController.js
import Reel from "../models/Reel.js";
import { uploadVideoBuffer, deleteFromCloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises";

// ✅ Create reel
export const createReel = async (req, res) => {
  try {
    const userId = req.userId;
    const { caption } = req.body;
    if (!req.file) return res.status(400).json({ message: "No video file provided." });

    const localPath = req.file.path;
    const uploadResult = await uploadVideoBuffer(localPath, {
      resource_type: "video",
      folder: `reels/${userId}`,
    });
    await fs.unlink(localPath).catch(() => {});

    const reel = await Reel.create({
      userId,
      videoUrl: uploadResult.secure_url,
      videoPublicId: uploadResult.public_id,
      caption,
      duration: uploadResult.duration,
    });

    const populatedReel = await reel.populate("userId", "username profilePic");
    res.status(201).json(populatedReel);
  } catch (err) {
    console.error("Create reel error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get feed or explore reels
export const getReels = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || "1"));
    const limit = Math.min(20, parseInt(req.query.limit || "10"));
    const skip = (page - 1) * limit;
    const mode = req.query.mode || "feed"; // "feed" or "explore"

    let filter = {};
    if (mode === "feed" && req.userFollowing?.length) {
      filter.userId = { $in: [...req.userFollowing, req.userId] };
    }

    const reels = await Reel.find(filter)
      .populate("userId", "username profilePic")
      .sort(mode === "trending" ? { likes: -1, createdAt: -1 } : { createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(reels);
  } catch (err) {
    console.error("Get reels error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Like/unlike reel
export const toggleLike = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    const userId = req.userId;
    const liked = reel.likes.includes(userId);

    if (liked) {
      reel.likes.pull(userId);
    } else {
      reel.likes.push(userId);
    }
    await reel.save();

    res.json({ liked: !liked, likesCount: reel.likes.length });
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Comment text required" });

    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    reel.comments.push({ userId: req.userId, text });
    await reel.save();

    const populated = await reel.populate("comments.userId", "username profilePic");
    const newComment = populated.comments[populated.comments.length - 1];

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add reply to a comment
export const addReply = async (req, res) => {
  try {
    const { text } = req.body;
    const { id, commentId } = req.params;

    const reel = await Reel.findById(id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    const comment = reel.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ userId: req.userId, text });
    await reel.save();

    const populated = await reel.populate("comments.replies.userId", "username profilePic");
    res.status(201).json(comment.replies[comment.replies.length - 1]);
  } catch (err) {
    console.error("Reply error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete reel (user’s own only)
export const deleteReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });
    if (reel.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (reel.videoPublicId) {
      await deleteFromCloudinary(reel.videoPublicId);
    }

    await reel.deleteOne();
    res.json({ message: "Reel deleted successfully" });
  } catch (err) {
    console.error("Delete reel error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
