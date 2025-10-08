const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const errorHandler = require("./middleware/errorHandler");

// routes importing
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

// getting env, connecting DB, express app
dotenv.config()
connectDB()
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(errorHandler);

// making routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})