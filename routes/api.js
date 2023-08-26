const express = require("express");
const router = express.Router();
const audioController = require("../controllers/audioController");

const multer = require("multer");
const upload = multer().single("audioFile");

// Upload audio file
router.post("/upload", upload, audioController.uploadAudio);

// Get all audio files
router.get("/files", audioController.getAllFiles);

module.exports = router;
