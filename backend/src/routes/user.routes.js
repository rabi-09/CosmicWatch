import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { addToHistory, getHistory, getAlerts, markAlertRead } from "../controllers/user.controller.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post("/history", addToHistory);
router.get("/history", getHistory);
router.get("/alerts", getAlerts);
router.put("/alerts/:id/read", markAlertRead);


export default router;
