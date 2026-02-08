import express from "express";
import passport from "passport";
import { register, login, socialCallback } from "../controllers/auth.controller.js";

const router = express.Router();

// Local Auth
router.post("/signup", register);
router.post("/login", login);

// Google Auth
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    socialCallback
);

// GitHub Auth
router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/login", session: false }),
    socialCallback
);

export default router;
