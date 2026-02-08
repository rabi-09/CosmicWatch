import mongoose from "mongoose";

/******************************************************************
 FUTURE PREDICTION MODEL
 - Used for charts & timelines
 - Stored as discrete prediction points
******************************************************************/
const FuturePredictionSchema = new mongoose.Schema({
    asteroidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asteroid",
        index: true
    },

    predictedDate: Date,
    predictedDistanceKm: Number,
    predictedVelocityKps: Number,
    predictedRiskLevel: String
});

export const FuturePrediction = mongoose.model(
    "FuturePrediction",
    FuturePredictionSchema
);
