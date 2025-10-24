import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: "User Already exist" });

        const user = await bcrypt.hash(password, 10)

        const User = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user.findOne({ email })
        if (user) return res.status(400).json({ message: "User Already exist" })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        res.status(200).json({ message: "Login Succesfully", token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}