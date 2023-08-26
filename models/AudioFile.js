const mongoose = require("mongoose");

const audioFileSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  size: Number,
  url: String,
});

const AudioFile = mongoose.model("AudioFile", audioFileSchema);

module.exports = AudioFile;
