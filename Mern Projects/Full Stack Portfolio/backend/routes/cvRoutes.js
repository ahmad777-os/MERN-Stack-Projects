import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- UPLOAD CV ---
router.post("/", protect, upload.single("cv"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    res.status(201).json({
      message: "CV uploaded successfully",
      filePath: `/uploads/${req.file.filename}`,
      fileName: req.file.filename,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- DELETE CV ---
router.delete("/:filename", protect, (req, res) => {
  try {
    const fileToDelete = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", fileToDelete);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(filePath);
    res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- GET ALL CVS ---
router.get("/", protect, (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) return res.json([]);

    const files = fs.readdirSync(uploadsDir);
    const cvs = files.map(file => ({
      fileName: file,
      filePath: `/uploads/${file}`,
    }));

    res.status(200).json(cvs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
