// server/models/Reel.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ReelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videoUrl: { type: String, required: true },
  videoPublicId: { type: String }, // Cloudinary public_id
  caption: { type: String, default: "" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [CommentSchema],
  duration: { type: Number }, // optional: seconds
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Reel || mongoose.model("Reel", ReelSchema);
