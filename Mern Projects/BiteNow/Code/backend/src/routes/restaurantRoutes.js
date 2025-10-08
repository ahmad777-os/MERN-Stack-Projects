import express from "express";
import Restaurant from "../models/Restaurant.js";
import { protect, ownerOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create restaurant (Owner only)
router.post("/", protect, ownerOnly, async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    const restaurant = await Restaurant.create({
      ownerId: req.user._id,
      name,
      address,
      phone,
    });

    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update restaurant (Owner only)
router.put("/:id", protect, ownerOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) return res.status(404).json({ message: "Not found" });
    if (restaurant.ownerId.toString() !== req.user._id.toString() && req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Not your restaurant" });
    }

    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("ownerId", "name email");
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
