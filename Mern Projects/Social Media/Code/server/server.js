import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import reelRoutes from "./routes/reelsRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// ✅ CORS setup (modern and flexible)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // both dev ports
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Serve uploaded files (images/videos)
app.use("/uploads", express.static(path.resolve("uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Track online users
let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("userConnected", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`✅ User ${userId} is online`);
  });

  socket.on("sendMessage", (data) => {
    const receiverSocket = onlineUsers.get(data.receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", data);
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`🔴 User ${userId} disconnected`);
        break;
      }
    }
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running with Socket.io on port ${PORT}`)
);
