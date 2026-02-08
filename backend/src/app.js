import express from "express";
import cors from "cors";
import passport from "passport";
import asteroidRoutes from "./routes/asteroid.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import "./config/passport.js"; // Import passport config
import startCronJobs from "./cron/sync.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("🚀 Cosmic Watch Backend Running");
});

app.use("/api/asteroids", asteroidRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start Cron Jobs
startCronJobs();

export default app;
