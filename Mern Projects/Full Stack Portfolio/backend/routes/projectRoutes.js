import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";


const router = express.Router();

// =============================
// 📌 Public - Get all projects
// =============================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// ===========================================
// 📌 Admin - Add new project with image upload
// ===========================================
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const project = new Project({
      title,
      description,
      image,
      link,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ========================================================
// 📌 Admin - Update project (with optional new image upload)
// ========================================================
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =============================
// 📌 Admin - Delete project
// =============================
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
