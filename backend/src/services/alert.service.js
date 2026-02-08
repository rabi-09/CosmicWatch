import { Alert } from "../models/Alert.js";
import { User } from "../models/User.js";

// Check if we need to alert users about this asteroid
export const createRiskAlerts = async (asteroid, riskAnalysis) => {
    try {
        // Only alert for HIGH or EXTREME risk
        if (riskAnalysis.riskLevel !== "HIGH" && riskAnalysis.riskLevel !== "EXTREME") {
            return;
        }

        console.log(`[ALERT SERVICE] High risk detected for ${asteroid.name}. Broadcasting to all users.`);

        // Find ALL users to broadcast the alert
        const allUsers = await User.find({}, "_id");

        if (allUsers.length === 0) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const user of allUsers) {
            // Check if alert already exists for today to avoid spam
            const existingAlert = await Alert.findOne({
                userId: user._id,
                asteroidId: asteroid._id,
                createdAt: { $gte: today }
            });

            if (!existingAlert) {
                await Alert.create({
                    userId: user._id,
                    asteroidId: asteroid._id,
                    alertType: "RISK_INCREASE",
                    message: `⚠️ HIGH RISK ALERT: Asteroid ${asteroid.name} has a ${riskAnalysis.riskLevel} risk level! Impact probability: ${(riskAnalysis.impactProbability * 100).toFixed(2)}%.`,
                    isRead: false
                });
            }
        }
        console.log(`[ALERT SERVICE] Broadcasted alerts to ${allUsers.length} users.`);

    } catch (err) {
        console.error("Error creating alerts:", err.message);
    }
};
