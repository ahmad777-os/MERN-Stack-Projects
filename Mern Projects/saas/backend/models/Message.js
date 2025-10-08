// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    read: { type: Boolean, default: false }, // ✅ unread tracking
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
