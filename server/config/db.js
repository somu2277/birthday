import mongoose from "mongoose";
import Memory from "../models/Memory.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB Atlas");
    console.log(`✓ Database: ${conn.connection.name}`);
    
    // Run automatic seeding check on startup
    const count = await Memory.countDocuments();
    if (count === 0) {
      console.log("⚠ Database contains 0 memories. No default seeding was performed because mock data has been removed.");
    } else {
      console.log(`✓ Database contains ${count} memories. Skipping seeder.`);
    }

    return true;
  } catch (error) {
    console.error("==================================================");
    console.error("❌ MONGODB CONNECTION ERROR");
    console.error(`Reason: ${error.message}`);
    console.error("==================================================");
    console.error("Critical: Could not establish MongoDB Atlas connection. Stopping server...");
    process.exit(1);
  }
};

