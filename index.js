const express = require("express");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const apiRoutes = require("./routes/api");
const cors = require("cors");
const cloudinary = require("cloudinary");
const { connectDB } = require("./config/connection");
const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 104857600 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api", apiRoutes);

const PORT = /* process.env.PORT || */ 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
