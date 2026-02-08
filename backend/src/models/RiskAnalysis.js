import mongoose from "mongoose";

/******************************************************************
 RISK ANALYSIS MODEL
 - Precomputed results
 - Avoids heavy recalculations
******************************************************************/
const RiskAnalysisSchema = new mongoose.Schema({
    asteroidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asteroid",
        unique: true
    },

    riskLevel: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH", "EXTREME"]
    },

    impactProbability: Number,
    energyMegatons: Number,

    impactZones: [
        {
            country: String,
            affectedRadiusKm: Number,
            severityIndex: Number
        }
    ],

    history: [
        {
            riskLevel: String,
            impactProbability: Number,
            calculatedAt: { type: Date, default: Date.now }
        }
    ],

    probabilities: {
        LOW: Number,
        MEDIUM: Number,
        HIGH: Number
    },
    explanation: mongoose.Schema.Types.Mixed,

    calculatedAt: Date
});

export const RiskAnalysis = mongoose.model(
    "RiskAnalysis",
    RiskAnalysisSchema
);
