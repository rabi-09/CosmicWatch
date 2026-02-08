import cron from "node-cron";
import { fetchAsteroidData } from "../services/nasa.service.js";

const startCronJobs = () => {
    // Run every day at midnight
    cron.schedule("0 0 * * *", () => {
        console.log("Running Daily Asteroid Sync...");
        fetchAsteroidData();
    });
};

export default startCronJobs;
