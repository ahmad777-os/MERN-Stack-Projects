// =======================
// 📌 Imports
// =======================
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import restaurantRoutes from "./routes/restaurantRoutes.js";

import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";

// =======================
// 📌 Config
// =======================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// =======================
// 📌 Middleware
// =======================
app.use(
  cors({
    origin: CLIENT_URL, // allow frontend URL
    credentials: true,  // allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());

// =======================
// 📌 Superadmin Seeder
// =======================
const seedSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "superadmin" });
    if (existingAdmin) {
      console.log("ℹ️ Superadmin already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, salt);

    await User.create({
      name: "Super Admin",
      email: process.env.SUPERADMIN_EMAIL,
      passwordHash,
      role: "superadmin",
    });

    console.log("✅ Superadmin seeded");
  } catch (err) {
    console.error("❌ Error seeding superadmin:", err.message);
  }
};

// =======================
// 📌 MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await seedSuperAdmin();
  })
  .catch((err) => console.error("❌ DB Connection Failed:", err.message));

// =======================
// 📌 Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// =======================
// 📌 Server Listen
// =======================
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// {
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2JlMmQwZjg1ZDJlOTU3MDlhZWQwYiIsInJvbGUiOiJvd25lciIsImlhdCI6MTc1ODE5MjU1MCwiZXhwIjoxNzU4MTkzNDUwfQ.C_JUZS23Ti0woo8goH6dHWA7eeTn9h0QYOh6Dvhk6qE",
//   "user": {
//     "id": "68cbe2d0f85d2e95709aed0b",
//     "name": "Ahmad Owner",
//     "email": "owner@gmail.com",
//     "role": "owner"
//   }
// }