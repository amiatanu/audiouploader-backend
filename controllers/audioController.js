const AudioFile = require("../models/AudioFile");

exports.uploadAudio = async (req, res) => {
  try {
    const { metadata } = req.body; // Extract metadata from the request body

    const audioFile = new AudioFile({
      originalName: metadata.originalName,
      mimeType: metadata.mimeType,
      size: metadata.size,
      data: req.file.buffer, // req.file.buffer contains the binary data of the uploaded file
    });

    await audioFile.save(); // Save the audio file data to the database

    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await AudioFile.find();
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
