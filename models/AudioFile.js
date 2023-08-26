const mongoose = require("mongoose");

const audioFileSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  size: Number,
  data: Buffer, // Store audio file data as a buffer
});

const AudioFile = mongoose.model("AudioFile", audioFileSchema);

module.exports = AudioFile;
