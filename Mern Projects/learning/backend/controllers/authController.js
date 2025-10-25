import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User Already Exist" });

    await User.create({ name, email, password, role }); // password is auto-hashed
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User Not Found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "User Login Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
