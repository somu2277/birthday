import fs from "fs";
import path from "path";

// Seed data
let memories = [
  {
    id: 1,
    date: "October 2021",
    title: "The Beginning of an Amazing Bond",
    description: "It started with a simple project collaboration, and we quickly realized we clicked perfectly. Your guidance and positive attitude set the foundation for our friendship.",
    category: "work"
  },
  {
    id: 2,
    date: "March 2022",
    title: "Late Night Coding Sessions",
    description: "Remember when we stayed up till 4 AM debugging that obscure memory leak? We were exhausted but laughing the entire time. Those nights defined our shared grit.",
    category: "adventure"
  },
  {
    id: 3,
    date: "August 2022",
    title: "The Unplanned Road Trip",
    description: "Taking off on a whim with no hotel booked, just a playlist of our favorite songs and a quest for the best highway diner. Absolutely unforgettable vibes.",
    category: "travel"
  },
  {
    id: 4,
    date: "January 2024",
    title: "Celebrating Your Big Win",
    description: "When you landed that major milestone, celebrating together felt like a win for both of us. Seeing you succeed is always one of my favorite things.",
    category: "celebration"
  },
  {
    id: 5,
    date: "June 2025",
    title: "Through Thick and Thin",
    description: "When things got tough, you were the first person to offer support. No judgment, just pure loyalty and sound advice. You're more than just a friend; you're family.",
    category: "support"
  }
];

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

// Controllers
export const getMemories = async (req, res) => {
  try {
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching memories", error: error.message });
  }
};

export const getGallery = async (req, res) => {
  try {
    res.status(200).json(galleryImages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gallery", error: error.message });
  }
};

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
    console.log("New birthday message received:", newMessage);
    res.status(201).json({ message: "Message received successfully", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error saving message", error: error.message });
  }
};

export const postUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    
    // Add uploaded file to gallery
    const newImage = {
      id: galleryImages.length + 1,
      title: req.body.title || "Uploaded Memory",
      caption: req.body.caption || "A new shared moment.",
      imageUrl: `/uploads/${req.file.filename}`,
      category: req.body.category || "uploads"
    };
    galleryImages.push(newImage);

    res.status(201).json({
      message: "Image uploaded and added to gallery successfully",
      imageUrl: newImage.imageUrl,
      data: newImage
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};
