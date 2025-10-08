const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
