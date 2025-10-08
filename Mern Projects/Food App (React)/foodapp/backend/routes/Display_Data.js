const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser'); // JWT auth middleware

// Route to send food data (existing)
router.post("/foodData", (req, res) => {
  try {
    if (!global.food_items) {
      return res.status(500).send("Food data not available");
    }
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Route to send user data after verifying JWT token
router.get("/userdata", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
