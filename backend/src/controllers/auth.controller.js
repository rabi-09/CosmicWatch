import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "7d" }
    );
};

// Register User
export const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            passwordHash
        });

        const token = generateToken(user);

        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
};


// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        if (!user.passwordHash) {
            return res.status(400).json({ message: "Please log in with your social account" });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// OAuth Callback
export const socialCallback = (req, res) => {
    // Passport middleware attaches user to req.user
    if (!req.user) return res.status(401).json({ message: "Authentication failed" });

    const token = generateToken(req.user);

    // Redirect to frontend with token
    // Adjust FRONTEND_URL as needed
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/auth/success?token=${token}`);
};
