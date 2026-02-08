import http from "http";
import app from "./src/app.js";
import { ENV } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";


const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  server.listen(ENV.PORT, () => {
    console.log(`✅ Server running on http://localhost:${ENV.PORT}`);
  });
};

startServer();
