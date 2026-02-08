import { SearchHistory } from "../models/SearchHistory.js";
import { Asteroid } from "../models/Asteroid.js";

// Add asteroid to user's search history
export const addToHistory = async (req, res) => {
    try {
        const userId = req.user.id; // From passport middleware
        const { asteroidId } = req.body;

        if (!asteroidId) {
            return res.status(400).json({ message: "Asteroid ID is required" });
        }

        // specific check: verify asteroid exists
        const asteroid = await Asteroid.findById(asteroidId);
        if (!asteroid) {
            return res.status(404).json({ message: "Asteroid not found" });
        }

        // Upsert to update timestamp if already exists, or create new
        // Actually model says "searchedAt" is default now. Upsert might not update date unless we force it.
        // Better to create new entry for "history" log? OR just keep unique (User, Asteroid) pair?
        // User requirement: "Profile -> history of viewed asteroids". 
        // Usually history is a log. But "My Watched Asteroids" implies a list.
        // Let's use upsert to keep it clean list of "watched" items, updating timestamp.

        await SearchHistory.findOneAndUpdate(
            { userId, asteroidId },
            { searchedAt: new Date() },
            { upsert: true, new: true }
        );

        res.json({ message: "Added to history" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user's search history
export const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await SearchHistory.find({ userId })
            .populate("asteroidId") // Populate asteroid details
            .sort({ searchedAt: -1 });

        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user alerts
import { Alert } from "../models/Alert.js";

export const getAlerts = async (req, res) => {
    try {
        const userId = req.user.id;
        const alerts = await Alert.find({ userId })
            .populate("asteroidId", "name") // Populate name for UI
            .sort({ createdAt: -1 });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mark alert as read
export const markAlertRead = async (req, res) => {
    try {
        const { id } = req.params;
        await Alert.findByIdAndUpdate(id, { isRead: true });
        res.json({ message: "Marked as read" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

