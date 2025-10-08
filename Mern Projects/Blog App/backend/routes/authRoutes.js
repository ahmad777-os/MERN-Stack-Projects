const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User");
const auth = require("../middleware/auth");

dotenv.config();
const router = express.Router();
const SECRET = process.env.JWT_SECRET || "8f72c0e2d7b1493f9ab6a4f3d928f1e6b47c3f805adf59e1fbc13a02a6d2e71d";

// ✅ Ensure Super Admin exists at server start
(async () => {
  try {
    const superAdmin = await User.findOne({ username: process.env.SUPER_ADMIN_USERNAME });
    if (!superAdmin) {
      const newSuperAdmin = new User({
        username: process.env.SUPER_ADMIN_USERNAME,
        password: process.env.SUPER_ADMIN_PASSWORD,
        role: "superadmin",
      });
      await newSuperAdmin.save();
      console.log("Super Admin created!");
    }
  } catch (err) {
    console.error("Error creating super admin:", err.message);
  }
})();

// --------------------- Signup ---------------------
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: "User already exists" });

    user = new User({ username, password }); // default role=user
    await user.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------- Login ---------------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------- Get All Users (Superadmin only) ---------------------
router.get("/users", auth, async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await User.find({}, "-password"); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------- Promote User to Admin ---------------------
router.put("/make-admin/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Only superadmin can promote users" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User promoted to admin", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------- Delete User/Admin ---------------------
router.delete("/delete-user/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Only superadmin can delete users" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted", deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
