const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "this is a  random string$#";

// Create User route
router.post(
  "/createuser",
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    try {
      const { name, email, password, location } = req.body;

      if (!name || !email || !password || !location) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: "User already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);

      await User.create({ name, email, password: secPassword, location });

      res.status(201).json({ success: true, message: "User created successfully." });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  }
);

// Login route
router.post("/loginuser",
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials." });
      }

      const pwdCompare = await bcrypt.compare(password, user.password);

      if (!pwdCompare) {
        return res.status(401).json({ success: false, message: "Invalid credentials." });
      }

      const data = {
        user: {
          id: user.id
        }
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, message: "Login successful.", authToken });

    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  }
);

module.exports = router;
