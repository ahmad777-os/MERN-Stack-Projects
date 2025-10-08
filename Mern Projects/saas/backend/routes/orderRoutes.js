import express from "express";
import Order from "../models/Order.js";
import Post from "../models/Post.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order (unpaid). We'll take payment next.
router.post("/create/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId).populate("createdBy", "name role");
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.createdBy._id.toString() === userId.toString()) {
      return res.status(400).json({ message: "You cannot order your own service" });
    }

    const order = await Order.create({
      post: post._id,
      buyer: userId,
      seller: post.createdBy._id,
      price: post.price,
      currency: "usd",
      status: "pending",
      paymentStatus: "unpaid",
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// get my orders
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ $or: [{ buyer: userId }, { seller: userId }] })
      .populate("post")
      .populate("buyer", "name")
      .populate("seller", "name");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;
