import dotenv from "dotenv";
import mongoose from "mongoose";
import Memory from "./models/Memory.js";

dotenv.config();

async function run() {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected! Fetching memories...");
    const memories = await Memory.find().sort({ position: 1, createdAt: -1 });
    console.log("COUNT:", memories.length);
    console.log("MEMORIES_JSON_START");
    console.log(JSON.stringify(memories, null, 2));
    console.log("MEMORIES_JSON_END");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
