import axios from "axios";
import { RiskAnalysis } from "../models/RiskAnalysis.js";
import { Asteroid } from "../models/Asteroid.js";
import { createRiskAlerts } from "./alert.service.js";

const ML_SERVICE_URL = "http://localhost:5001/";

const predictRiskFromML = async (asteroid) => {
    try {
        // Map asteroid data to ML model input format
        const payload = {
            diameter_km: asteroid.physical.diameterKmMax || 0.1,
            speed_kmph: (asteroid.orbital.velocityKps || 0) * 3600,
            miss_distance_km: asteroid.orbital.distanceFromEarthKm || 1000000,
            pha: asteroid.hazard.isPotentiallyHazardous ? 1 : 0,
            sentry: 0 // Default as field is not currently in schema
        };

        const response = await axios.post(ML_SERVICE_URL, payload);

        // Model returns: { risk: "HIGH", probabilities: { LOW, MEDIUM, HIGH }, explanation: ... }
        const { risk, probabilities, explanation } = response.data;

        // Map response to our internal RiskAnalysis format
        const energyMegatons = (payload.diameter_km * 1000); // Rough proxy
        const high = Number(probabilities?.HIGH ?? 0);
        const medium = Number(probabilities?.MEDIUM ?? 0);
        console.log(`ML Prediction for ${asteroid.name}: Risk=${risk}, Probabilities=`, probabilities);
        return {
            riskLevel: risk,
            impactProbability: high + medium,
            energyMegatons,
            impactZones: [], // specific impact zones not provided by ML currently
            probabilities: probabilities,
            explanation
        };

    } catch (error) {
        console.error("ML Service Error:", error.message);
        throw error; // Propagate error to fail gracefully instead of mocking
    }
};

export const analyzeAsteroidRisk = async (asteroidId) => {
    try {
        const asteroid = await Asteroid.findById(asteroidId);
        if (!asteroid) throw new Error("Asteroid not found");

        const prediction = await predictRiskFromML(asteroid);

        const riskAnalysis = await RiskAnalysis.findOneAndUpdate(
            { asteroidId: asteroid._id },
            {
                $set: {
                    riskLevel: prediction.riskLevel,
                    impactProbability: prediction.impactProbability,
                    energyMegatons: prediction.energyMegatons,
                    impactZones: prediction.impactZones,
                    probabilities: prediction.probabilities,
                    explanation: prediction.explanation,
                    calculatedAt: new Date(),
                },
                $push: {
                    history: {
                        riskLevel: prediction.riskLevel,
                        impactProbability: prediction.impactProbability,
                        calculatedAt: new Date()
                    }
                }
            },
            { upsert: true, new: true }
        );

        // trigger alerts
        await createRiskAlerts(asteroid, riskAnalysis);

        // Return combined data including probabilities and explanation for frontend
        // We merge the DB result with the prediction extras that might not be in the schema yet
        return {
            ...riskAnalysis.toObject(),
            probabilities: prediction.probabilities,
            explanation: prediction.explanation
        };
    } catch (err) {
        console.error(`Error analyzing risk for asteroid ${asteroidId}:`, err.message);
        throw err;
    }
};
