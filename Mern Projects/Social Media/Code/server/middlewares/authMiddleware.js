import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.userId = req.user._id; // ✅ Keep this
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default auth; // ✅ use default export here
