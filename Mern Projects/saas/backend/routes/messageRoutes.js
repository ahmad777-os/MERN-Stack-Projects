// routes/messageRoutes.js
import express from "express";
import Message from "../models/Message.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Send message (with populated sender/receiver so frontend sees names immediately)
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user._id;

    if (!receiverId || !text) {
      return res.status(400).json({ error: "Missing fields" });
    }

    let message = new Message({ senderId, receiverId, text });
    await message.save();

    // populate sender + receiver before sending back
    message = await message.populate("senderId", "name role location");
    message = await message.populate("receiverId", "name role location");

    res.status(201).json(message);
  } catch (err) {
    console.error("❌ Send message error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// ✅ Get chat with a partner (messages + populated sender/receiver)
router.get("/chat/:partnerId", authMiddleware, async (req, res) => {
  try {
    const { partnerId } = req.params;
    const userId = req.user._id;

    const chat = await Message.find({
      $or: [
        { senderId: userId, receiverId: partnerId },
        { senderId: partnerId, receiverId: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "name role location")
      .populate("receiverId", "name role location");

    res.json(chat);
  } catch (err) {
    console.error("❌ Chat fetch error:", err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// ✅ Mark messages as read
router.post("/read/:partnerId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { partnerId } = req.params;

    await Message.updateMany(
      { senderId: partnerId, receiverId: userId, read: false },
      { read: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Mark read error:", err);
    res.status(500).json({ error: "Failed to mark messages read" });
  }
});

// ✅ Get all conversations (Inbox view)
router.get("/conversations", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "name location")
      .populate("receiverId", "name location");

    const conversations = {};

    messages.forEach((msg) => {
      const partner =
        msg.senderId._id.toString() === userId.toString()
          ? msg.receiverId
          : msg.senderId;

      if (!conversations[partner._id]) {
        conversations[partner._id] = {
          user: partner,
          lastMessage: msg.text,
          lastTime: msg.createdAt,
          unread: 0,
        };
      }

      if (msg.receiverId._id.toString() === userId.toString() && !msg.read) {
        conversations[partner._id].unread += 1;
      }
    });

    res.json(Object.values(conversations));
  } catch (err) {
    console.error("❌ Conversations fetch error:", err);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

export default router;
