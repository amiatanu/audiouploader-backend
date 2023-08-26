const AudioFile = require("../models/AudioFile");
const cloudinary = require("cloudinary");

exports.uploadAudio = async (req, res) => {
  try {
    if (req.files && req.files.file && req.files.file.length) {
      for (let i = 0; i < req.files.file.length; i++) {
        const imageData = await cloudinary.v2.uploader.upload(
          req.files.file[i].tempFilePath,
          { resource_type: "auto" }
        );

        const newAudioFile = new AudioFile({
          originalName: req.files.file[i].name,
          mimeType: req.files.file[i].mimetype,
          size: req.files.file[i].size,
          url: imageData.secure_url,
        });

        await newAudioFile.save();
      }
    } else {
      const imageData = await cloudinary.v2.uploader.upload(
        req.files.file.tempFilePath,
        { resource_type: "auto" }
      );

      const newAudioFile = new AudioFile({
        originalName: req.files.file.name,
        mimeType: req.files.file.mimetype,
        size: req.files.file.size,
        url: imageData.secure_url,
      });

      await newAudioFile.save();
    }

    res
      .status(201)
      .json({ success: true, message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllFiles = async (req, res) => {
  const audioFile = await AudioFile.find();
  try {
    if (!audioFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json(audioFile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
