import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dns from "dns";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/api.js";

// Override system DNS with Google DNS to resolve Atlas hostnames
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT) || 5099;

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files with browser cache configuration (Cache-Control)
app.use("/uploads", express.static(uploadsDir, {
  maxAge: "7d",
  setHeaders: (res, path) => {
    res.setHeader("Cache-Control", "public, max-age=604800");
  }
}));

// API Routes
app.use("/api", apiRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Birthday Surprise API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: err.message || "An internal server error occurred" });
});

// Bootstrap server only after DB connection succeeds
const startServer = async () => {
  // Connect to Atlas. Connection failure triggers process.exit(1) inside connectDB
  await connectDB();
  
  const server = app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
  });

  server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.error(`Error: listen EADDRINUSE: address already in use :::${PORT}`);
      console.log("Retrying startup on next available port (port + 1)...");
      const nextPort = PORT + 1;
      
      const fallbackServer = app.listen(nextPort, () => {
        console.log(`✓ Server running on port ${nextPort} (fallback mode)`);
      });
      
      fallbackServer.on("error", (err) => {
        console.error("Fallback server startup failed:", err.message);
      });
    } else {
      console.error("Server socket error:", e.message);
    }
  });
};

startServer();
