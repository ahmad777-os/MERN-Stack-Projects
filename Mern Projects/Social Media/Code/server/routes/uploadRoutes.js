import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// ✅ configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpg|jpeg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only JPG, JPEG, PNG, and WEBP files are allowed"));
  },
});

// ✅ POST — upload new image
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// ✅ PUT — update (replace) existing image
router.put("/", upload.single("image"), (req, res) => {
  const oldImageUrl = req.body.oldUrl;

  // remove old image if exists
  if (oldImageUrl) {
    const oldPath = path.join(
      "uploads",
      path.basename(new URL(oldImageUrl).pathname)
    );
    fs.unlink(oldPath, (err) => {
      if (err) console.warn("⚠️ Old image not found:", err.message);
    });
  }

  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  const newImageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: newImageUrl });
});

// ✅ DELETE — delete an uploaded image
router.delete("/", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Image URL is required" });

  const filePath = path.join("uploads", path.basename(new URL(url).pathname));

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("❌ Delete error:", err);
      return res.status(404).json({ message: "Image not found" });
    }
    res.json({ message: "Image deleted successfully" });
  });
});

export default router;
