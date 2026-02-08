import { Asteroid } from "../models/Asteroid.js";
import { RiskAnalysis } from "../models/RiskAnalysis.js";
import { fetchAsteroidData, fetchAsteroidById } from "../services/nasa.service.js";

// Get all asteroids with pagination & filters
export const getAsteroids = async (req, res) => {
  try {
    const { page = 1, limit = 10, hazard } = req.query;
    const query = {};

    if (hazard === "true") query["hazard.isPotentiallyHazardous"] = true;

    // Sync with NASA API first (optional: could be background job)
    await fetchAsteroidData();

    const asteroids = await Asteroid.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ "orbital.distanceFromEarthKm": 1 });

    const total = await Asteroid.countDocuments(query);

    res.json({
      asteroids,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single asteroid by ID or NASA ID
export const getAsteroidById = async (req, res) => {
  try {
    const { id } = req.params;
    let asteroid;

    // Check if valid ObjectId, else try nasaId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      asteroid = await Asteroid.findById(id);
    } else {
      asteroid = await Asteroid.findOne({ nasaId: id });
    }

    // If not found in DB, try fetching from NASA API
    if (!asteroid) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        // Assume it's a NASA ID
        asteroid = await fetchAsteroidById(id);
      }
    }

    if (!asteroid) return res.status(404).json({ message: "Asteroid not found" });

    res.json(asteroid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Risk Analysis for an asteroid
export const getRiskAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const risk = await RiskAnalysis.findOne({ asteroidId: id });

    if (!risk) return res.status(404).json({ message: "No risk analysis found for this asteroid" });

    res.json(risk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manually trigger risk analysis
import { analyzeAsteroidRisk } from "../services/risk.service.js";

export const analyzeRisk = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await analyzeAsteroidRisk(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
