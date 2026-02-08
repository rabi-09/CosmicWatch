import express from "express";
import { getAsteroids, getAsteroidById, getRiskAnalysis, analyzeRisk } from "../controllers/asteroid.controller.js";

const router = express.Router();

router.get("/", getAsteroids);
router.get("/:id", getAsteroidById);
router.get("/:id/risk", getRiskAnalysis);
router.post("/:id/analyze", analyzeRisk);

export default router;
