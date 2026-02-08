import mongoose from "mongoose";

/******************************************************************
 ALERT MODEL
 - Generated via background jobs
 - Read once, mark read
******************************************************************/
const AlertSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },

    asteroidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asteroid"
    },

    alertType: {
        type: String,
        enum: ["NEW_EVENT", "RISK_INCREASE", "CLOSE_APPROACH"]
    },

    message: String,

    isRead: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Alert = mongoose.model("Alert", AlertSchema);
