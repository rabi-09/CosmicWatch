import axios from "axios";
import { Asteroid } from "../models/Asteroid.js";
import { LiveTrajectory } from "../models/LiveTrajectory.js";
import { analyzeAsteroidRisk } from "./risk.service.js";

const NASA_API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export const fetchAsteroidData = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await axios.get(
      `${NASA_API_URL}?start_date=${today}&end_date=${today}&api_key=${API_KEY}`
    );

    const asteroids = response.data.near_earth_objects[today];

    if (!asteroids) return [];

    for (const data of asteroids) {
      const asteroid = await Asteroid.findOneAndUpdate(
        { nasaId: data.id },
        {
          name: data.name,
          physical: {
            diameterKmMin: data.estimated_diameter.kilometers.estimated_diameter_min,
            diameterKmMax: data.estimated_diameter.kilometers.estimated_diameter_max,
            massKg: 0, // Not provided in feed
            density: 0, // Not provided
            absoluteMagnitudeH: data.absolute_magnitude_h
          },
          orbital: {
            velocityKps: parseFloat(data.close_approach_data[0].relative_velocity.kilometers_per_second),
            distanceFromEarthKm: parseFloat(data.close_approach_data[0].miss_distance.kilometers),
            orbitingBody: data.close_approach_data[0].orbiting_body,
            eccentricity: 0,
            inclination: 0,
          },
          closeApproachData: data.close_approach_data.map(cad => ({
            closeApproachDate: cad.close_approach_date,
            closeApproachDateFull: cad.close_approach_date_full,
            epochDateCloseApproach: cad.epoch_date_close_approach,
            relativeVelocity: {
              kilometersPerSecond: cad.relative_velocity.kilometers_per_second,
              kilometersPerHour: cad.relative_velocity.kilometers_per_hour,
              milesPerHour: cad.relative_velocity.miles_per_hour
            },
            missDistance: {
              astronomical: cad.miss_distance.astronomical,
              lunar: cad.miss_distance.lunar,
              kilometers: cad.miss_distance.kilometers,
              miles: cad.miss_distance.miles
            },
            orbitingBody: cad.orbiting_body
          })),
          hazard: {
            isPotentiallyHazardous: data.is_potentially_hazardous_asteroid,
          },
          lastUpdated: new Date(),
        },
        { upsert: true, new: true }
      );

      // Store Asteroid Event (Close Approach)
      if (data.close_approach_data && data.close_approach_data.length > 0) {
        const event = data.close_approach_data[0];
        await import("../models/AsteroidEvent.js").then(async ({ AsteroidEvent }) => {
          await AsteroidEvent.create({
            asteroidId: asteroid._id,
            eventType: "CLOSE_APPROACH",
            eventDate: new Date(event.close_approach_date_full),
            missDistanceKm: parseFloat(event.miss_distance.kilometers),
            relativeVelocityKps: parseFloat(event.relative_velocity.kilometers_per_second)
          });
        });
      }

      if (asteroid) {
        await LiveTrajectory.create({
          asteroidId: asteroid._id,
          timestamp: new Date(),
          position: {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            z: (Math.random() - 0.5) * 100
          }, // Mock 3D pos for demo
          velocity: { vx: 0, vy: 0, vz: 0 }
        });

        // Trigger Risk Analysis
        await analyzeAsteroidRisk(asteroid._id);
      }
    }

    console.log(`Fetched and synced ${asteroids.length} asteroids.`);
    return asteroids;
  } catch (err) {
    console.error("Error fetching NASA data:", err.message);
    return [];
  }
};

export const fetchAsteroidById = async (nasaId) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${nasaId}?api_key=${API_KEY}`
    );
    const data = response.data;

    if (!data) return null;

    const asteroid = await Asteroid.findOneAndUpdate(
      { nasaId: data.id },
      {
        name: data.name,
        physical: {
          diameterKmMin: data.estimated_diameter.kilometers.estimated_diameter_min,
          diameterKmMax: data.estimated_diameter.kilometers.estimated_diameter_max,
          massKg: 0, // Not provided in feed
          density: 0, // Not provided
          absoluteMagnitudeH: data.absolute_magnitude_h
        },
        orbital: {
          velocityKps: parseFloat(
            data.close_approach_data[0].relative_velocity.kilometers_per_second
          ),
          distanceFromEarthKm: parseFloat(
            data.close_approach_data[0].miss_distance.kilometers
          ),
          orbitingBody: data.close_approach_data[0].orbiting_body,
          eccentricity: 0,
          inclination: 0,
        },
        closeApproachData: data.close_approach_data.map(cad => ({
          closeApproachDate: cad.close_approach_date,
          closeApproachDateFull: cad.close_approach_date_full,
          epochDateCloseApproach: cad.epoch_date_close_approach,
          relativeVelocity: {
            kilometersPerSecond: cad.relative_velocity.kilometers_per_second,
            kilometersPerHour: cad.relative_velocity.kilometers_per_hour,
            milesPerHour: cad.relative_velocity.miles_per_hour
          },
          missDistance: {
            astronomical: cad.miss_distance.astronomical,
            lunar: cad.miss_distance.lunar,
            kilometers: cad.miss_distance.kilometers,
            miles: cad.miss_distance.miles
          },
          orbitingBody: cad.orbiting_body
        })),
        hazard: {
          isPotentiallyHazardous: data.is_potentially_hazardous_asteroid,
        },
        lastUpdated: new Date(),
      },
      { upsert: true, new: true }
    );

    // Store Asteroid Event (Close Approach)
    if (data.close_approach_data && data.close_approach_data.length > 0) {
      const event = data.close_approach_data[0];
      await import("../models/AsteroidEvent.js").then(async ({ AsteroidEvent }) => {
        await AsteroidEvent.create({
          asteroidId: asteroid._id,
          eventType: "CLOSE_APPROACH",
          eventDate: new Date(event.close_approach_date_full),
          missDistanceKm: parseFloat(event.miss_distance.kilometers),
          relativeVelocityKps: parseFloat(event.relative_velocity.kilometers_per_second),
        });
      });
    }

    if (asteroid) {
      // Check if trajectory exists
      const existingTrajectory = await LiveTrajectory.findOne({ asteroidId: asteroid._id });

      if (!existingTrajectory) {
        await LiveTrajectory.create({
          asteroidId: asteroid._id,
          timestamp: new Date(),
          position: {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            z: (Math.random() - 0.5) * 100,
          }, // Mock 3D pos for demo
          velocity: { vx: 0, vy: 0, vz: 0 },
        });

        // Trigger Risk Analysis
        await analyzeAsteroidRisk(asteroid._id);
      }
    }
    return asteroid;
  } catch (err) {
    console.error(`Error fetching NASA data for ID ${nasaId}:`, err.message);
    return null;
  }
};
