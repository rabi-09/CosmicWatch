import dotenv from "dotenv";

dotenv.config();

if (!process.env.NASA_API_KEY) {
  throw new Error("NASA_API_KEY is missing");
}

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

export const ENV = {
  PORT: process.env.PORT || 5000,
  NASA_API_KEY: process.env.NASA_API_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "dummy",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "dummy",
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "dummy",
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || "dummy",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173"
};
