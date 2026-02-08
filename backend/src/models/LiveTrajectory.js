import mongoose from "mongoose";

/******************************************************************
 LIVE TRAJECTORY MODEL
 - Optimized for Three.js rendering
 - Time-series style storage
******************************************************************/
const LiveTrajectorySchema = new mongoose.Schema({
    asteroidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asteroid",
        index: true
    },

    timestamp: {
        type: Date,
        index: true
    },

    position: {
        x: Number,
        y: Number,
        z: Number
    },

    velocity: {
        vx: Number,
        vy: Number,
        vz: Number
    }
});

LiveTrajectorySchema.index({ asteroidId: 1, timestamp: -1 });

export const LiveTrajectory = mongoose.model(
    "LiveTrajectory",
    LiveTrajectorySchema
);
