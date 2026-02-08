import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ENV } from "../config/env.js";

export const authenticate = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            // Note: auth.controller.js uses process.env.JWT_SECRET || "fallback_secret"
            // We should use ENV.JWT_SECRET if available, or match the controller.
            // Let's assume ENV.JWT_SECRET is correct or fallback.
            const secret = process.env.JWT_SECRET || "fallback_secret";

            const decoded = jwt.verify(token, secret);

            // Get user from the token
            req.user = await User.findById(decoded.id).select("-passwordHash");

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
