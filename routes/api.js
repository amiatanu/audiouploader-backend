const express = require("express");
const router = express.Router();
const audioController = require("../controllers/audioController");

// Upload audio file
router.post("/upload", audioController.uploadAudio);

// Get all audio files
router.get("/files", audioController.getAllFiles);

module.exports = router;
