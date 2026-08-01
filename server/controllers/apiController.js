import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Memory from "../models/Memory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let galleryImages = [
  {
    id: 1,
    title: "Vibrant Coding Days",
    caption: "Where all the magic started.",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    category: "work"
  },
  {
    id: 2,
    title: "Late Night Diner",
    caption: "Post-hackathon celebrations at 3 AM.",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    category: "food"
  },
  {
    id: 3,
    title: "Road Trip Vibe",
    caption: "Sunset drives through the mountains.",
    gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    category: "travel"
  },
  {
    id: 4,
    title: "Concert Lights",
    caption: "Singing our hearts out in the rain.",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    category: "adventure"
  },
  {
    id: 5,
    title: "Graduation Day",
    caption: "Looking sharp and ready to conquer the world.",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    category: "celebration"
  },
  {
    id: 6,
    title: "Coffee Conversations",
    caption: "Plotting our next big startup idea.",
    gradient: "linear-gradient(135deg, #f97316, #ea580c)",
    category: "chat"
  }
];

let messages = [];

// Fetch all memories from MongoDB Atlas
export const getMemories = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    console.error("Database offline or disconnected. Cannot serve memories.");
    return res.status(500).json({ success: false, message: "Database connection is offline." });
  }

  try {
    let list = await Memory.find().sort({ position: 1, createdAt: -1 });

    const sampleSeed = [
      {
        title: "First Pic",
        date: "October 2021",
        description: "It started with a simple project collaboration, and we quickly realized we clicked perfectly. Your guidance and positive attitude set the foundation for our friendship.",
        category: "work",
        image: "/images/gallery/memory1.jpeg",
        position: 0
      },
      {
        title: "Blessed Bond",
        date: "March 2022",
        description: "Remember when we stayed up till 4 AM debugging that obscure memory leak? We were exhausted but laughing the entire time. Those nights defined our grit.",
        category: "adventure",
        image: "/images/gallery/memory3.jpeg",
        position: 1
      },
      {
        title: "The Unplanned Trip",
        date: "August 2022",
        description: "Taking off on a whim with no hotel booked, just a playlist of our favorite songs and a quest for the best highway diner. Absolutely unforgettable vibes.",
        category: "travel",
        image: "/images/gallery/memory2.jpeg",
        position: 2
      },
      {
        title: "Temple Vibes",
        date: "January 2024",
        description: "When you landed that major milestone, celebrating together felt like a win for both of us. Seeing you succeed is always one of my favorite things.",
        category: "celebration",
        image: "/images/gallery/memory4.jpeg",
        position: 3
      },
      {
        title: "Best Company",
        date: "June 2025",
        description: "When things got tough, you were the first person to offer support. No judgment, just pure loyalty and sound advice. You're more than just a friend; you're family.",
        category: "support",
        image: "/images/gallery/memory5.jpeg",
        position: 4
      },
      {
        title: "Timeless Moments",
        date: "July 2026",
        description: "Always standing by each other and sharing the best laughs. Looking forward to many more milestones together.",
        category: "chat",
        image: "/images/gallery/memory6.jpeg",
        position: 5
      }
    ];

    // Seed exactly 6 sample memories if database returns empty
    if (list.length === 0) {
      console.log("Database contains 0 memories. Seeding exactly 6 sample memories...");
      list = await Memory.insertMany(sampleSeed);
      console.log(`✓ Seeded ${list.length} memories into MongoDB Atlas`);
    } else if (list.length < 6) {
      console.log(`Database has only ${list.length} memories. Checking for missing positions...`);
      for (let pos = 0; pos < 6; pos++) {
        const exists = list.some(m => m.position === pos);
        if (!exists) {
          console.log(`Position ${pos} is missing in DB. Restoring...`);
          await Memory.create(sampleSeed[pos]);
        }
      }
      // Re-fetch to get all 6
      list = await Memory.find().sort({ position: 1, createdAt: -1 });
    }

    res.status(200).json({ success: true, memories: list });
  } catch (error) {
    console.error("Database query failed. Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to retrieve memories from database.", error: error.message });
  }
};

// Gallery image endpoints (read-only list placeholder)
export const getGallery = async (req, res) => {
  try {
    res.status(200).json(galleryImages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gallery", error: error.message });
  }
};

// Birthday messages endpoints
export const postMessage = async (req, res) => {
  try {
    const { name, content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Message content is required" });
    }
    const newMessage = {
      id: messages.length + 1,
      name: name || "Anonymous",
      content,
      createdAt: new Date()
    };
    messages.push(newMessage);
    res.status(201).json({ message: "Message received successfully", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error saving message", error: error.message });
  }
};

// Old simple image upload endpoint (compatibility wrapper)
export const postUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    const newImage = {
      id: galleryImages.length + 1,
      title: req.body.title || "Uploaded Memory",
      caption: req.body.caption || "A new shared moment.",
      imageUrl: `/uploads/${req.file.filename}`,
      category: req.body.category || "uploads"
    };
    galleryImages.push(newImage);
    res.status(201).json({
      message: "Image uploaded and added successfully",
      imageUrl: newImage.imageUrl,
      data: newImage
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};
