// server/middlewares/multer.js
import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 }, // 60 MB limit (adjust)
  fileFilter: (req, file, cb) => {
    const allowed = /mp4|mov|webm|mkv|ogg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) return cb(null, true);
    cb(new Error("Unsupported video format"));
  }
});
    