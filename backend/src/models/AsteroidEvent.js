import mongoose from "mongoose";

/******************************************************************
 ASTEROID EVENTS MODEL
 - Close approaches, flybys, orbit changes
 - Cached per asteroid for alert triggers
******************************************************************/
const AsteroidEventSchema = new mongoose.Schema({
    asteroidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asteroid",
        index: true
    },

    eventType: {
        type: String,
        enum: ["CLOSE_APPROACH", "FLYBY", "ORBIT_CHANGE", "IMPACT_RISK"]
    },

    eventDate: {
        type: Date,
        index: true
    },

    missDistanceKm: Number,
    relativeVelocityKps: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const AsteroidEvent = mongoose.model(
    "AsteroidEvent",
    AsteroidEventSchema
);
