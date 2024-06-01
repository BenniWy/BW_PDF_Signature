const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 3001;
const PIN = 1337; // Default Pin

const uploadedFiles = new Set();

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/api/document/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  uploadedFiles.add(req.file.originalname);
  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.originalname,
  });
});

app.post("/api/signature", (req, res) => {
  const { name, pin } = req.body;

  if (uploadedFiles.size === 0) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!name) {
    return res.status(400).json({ message: "Please enter your name" });
  }

  if (pin !== PIN) {
    return res.status(401).json({ message: "Invalid PIN" });
  }

  // Signature logic

  res.status(200).json({ message: "Signature collected successfully" });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
