// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ["worker", "hirer"],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: Number,
  deliveryTime: String,
  extras: String,
  experience: String,
  availability: String,
  contactPreference: {
    type: String,
    enum: ["phone", "whatsapp", "either"],
  },
  image: String, // store image file name or URL here
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
