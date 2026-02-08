import mongoose from "mongoose";

/******************************************************************
 ASTEROID CORE MODEL
 - Cached NASA data
 - Read-heavy collection
 - Indexed by nasaId for O(1) fetch
******************************************************************/
const AsteroidSchema = new mongoose.Schema({
    nasaId: {
        type: String,
        unique: true,
        index: true
    },

    name: String,

    physical: {
        diameterKmMin: Number,
        diameterKmMax: Number,
        massKg: Number,
        density: Number,
        absoluteMagnitudeH: Number
    },

    orbital: {
        velocityKps: Number,
        distanceFromEarthKm: Number,
        orbitingBody: String,
        eccentricity: Number,
        inclination: Number
    },

    closeApproachData: [{
        closeApproachDate: String,
        closeApproachDateFull: String,
        epochDateCloseApproach: Number,
        relativeVelocity: {
            kilometersPerSecond: String,
            kilometersPerHour: String,
            milesPerHour: String
        },
        missDistance: {
            astronomical: String,
            lunar: String,
            kilometers: String,
            miles: String
        },
        orbitingBody: String
    }],

    hazard: {
        isPotentiallyHazardous: Boolean,
        riskScore: Number
    },

    lastUpdated: Date
}, { timestamps: true });

AsteroidSchema.index({ "hazard.isPotentiallyHazardous": 1 });
AsteroidSchema.index({ "orbital.distanceFromEarthKm": 1 });

export const Asteroid = mongoose.model("Asteroid", AsteroidSchema);
