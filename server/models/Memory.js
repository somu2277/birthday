import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: "general"
  },
  image: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Memory = mongoose.model("Memory", memorySchema);
export default Memory;
