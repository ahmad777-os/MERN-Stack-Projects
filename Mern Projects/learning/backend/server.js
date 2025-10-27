import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// API Routes
app.use("/api/auth", authRoutes);         
app.use("/api/users", userRoutes);         
app.use("/api/restaurants", restaurantRoutes); 
app.use("/api/menu", menuRoutes);         
app.use("/api/orders", orderRoutes);       
app.use("/api/reviews", reviewRoutes);    

// Root Route
app.get("/", (req, res) => {
    res.send("Server is running and API is active!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
