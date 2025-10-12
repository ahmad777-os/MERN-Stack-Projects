// server/controllers/reels.js
import Reel from "../models/Reel.js";
import { uploadVideoBuffer } from "../utils/cloudinary.js";
import fs from "fs/promises";

// Create reel
export const createReel = async (req, res) => {
  try {
    const userId = req.userId;
    const { caption } = req.body;
    if (!req.file) return res.status(400).json({ message: "No video file." });

    const localPath = req.file.path;
    const uploadResult = await uploadVideoBuffer(localPath, {
      resource_type: "video",
      folder: `reels/${userId}`,
    });
    await fs.unlink(localPath).catch(() => {});

    const newReel = await Reel.create({
      userId,
      videoUrl: uploadResult.secure_url,
      videoPublicId: uploadResult.public_id,
      caption,
      duration: uploadResult.duration,
    });

    // ✅ Populate user data before returning
    const populatedReel = await Reel.findById(newReel._id).populate(
      "userId",
      "name username profilePic"
    );

    return res.status(201).json(populatedReel);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};


// Get reels (feed or explore) with pagination
export const getReels = async (req, res) => {
  try {
    // ✅ make page 1-based instead of 0-based
    const page = Math.max(1, parseInt(req.query.page || "1"));
    const limit = Math.min(20, parseInt(req.query.limit || "10"));
    const mode = req.query.mode || "feed";
    const sort = mode === "trending" ? { likesCount: -1, createdAt: -1 } : { createdAt: -1 };

    const skip = (page - 1) * limit; // ✅ correct skip value

    const reels = await Reel.aggregate([
      { $addFields: { likesCount: { $size: "$likes" } } },
      { $sort: sort },
      { $skip: skip }, // ✅ FIXED HERE
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          comments: 0
        }
      }
    ]);

    return res.json(reels);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


// Like/unlike
export const toggleLike = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    const userId = req.userId;
    const alreadyLiked = reel.likes.includes(userId);

    if (alreadyLiked) {
      reel.likes = reel.likes.filter((id) => id.toString() !== userId);
    } else {
      reel.likes.push(userId);
    }

    await reel.save();

    res.json({
      liked: !alreadyLiked,
      likesCount: reel.likes.length,
    });
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Add comment
export const addComment = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    const newComment = {
      userId: req.userId,
      text: req.body.text,
      createdAt: new Date(),
    };

    reel.comments.push(newComment);
    await reel.save();

    const populatedReel = await reel.populate("comments.userId", "username profilePic");

    const addedComment = populatedReel.comments[populatedReel.comments.length - 1];
    res.json(addedComment);
  } catch (err) {
    console.error("Comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
