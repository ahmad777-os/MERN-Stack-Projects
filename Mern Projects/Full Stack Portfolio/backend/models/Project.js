import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String, // URL (optional)
  link: String,  // project/demo link
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
