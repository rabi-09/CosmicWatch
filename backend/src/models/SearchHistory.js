import mongoose from "mongoose";

/******************************************************************
 SEARCH HISTORY MODEL
 - Extremely high read/write
 - Minimal fields for speed
******************************************************************/
const SearchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },

    asteroidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asteroid",
        index: true
    },

    searchedAt: {
        type: Date,
        default: Date.now
    }
});

SearchHistorySchema.index({ userId: 1, searchedAt: -1 });

export const SearchHistory = mongoose.model(
    "SearchHistory",
    SearchHistorySchema
);
