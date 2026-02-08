import mongoose from "mongoose";

/******************************************************************
 USER MODEL
 - Auth + preferences
 - Indexed for login & alert filtering
******************************************************************/
const UserSchema = new mongoose.Schema({
    name: String,
    avatar: String,

    email: {
        type: String,
        unique: true,
        index: true
    },

    passwordHash: String,

    preferences: {
        alertRiskLevel: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "HIGH"
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model("User", UserSchema);
