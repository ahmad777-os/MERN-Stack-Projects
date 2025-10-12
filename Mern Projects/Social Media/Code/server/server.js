import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// ✅ import route files
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import reelRoutes from "./routes/reelsRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ serve uploaded images statically
app.use("/uploads", express.static(path.resolve("uploads")));

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/reels", reelRoutes);

// ✅ server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
