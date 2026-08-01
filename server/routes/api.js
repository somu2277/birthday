import express from "express";
import multer from "multer";
import path from "path";
import { 
  getMemories, 
  getGallery, 
  postMessage, 
  postUpload 
} from "../controllers/apiController.js";

const router = express.Router();

// Multer Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (jpg, jpeg, png, gif, webp) are allowed!"));
    }
  }
});

// Get Memories (MongoDB)
router.get("/memories", getMemories);

// Additional endpoints
router.get("/gallery", getGallery);
router.post("/message", postMessage);
router.post("/upload", upload.single("image"), postUpload);

export default router;
