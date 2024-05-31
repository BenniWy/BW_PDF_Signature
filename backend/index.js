const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3001;
const PIN = 1337;

app.use(bodyParser.json());

app.get("/api/document", (req, res) => {
  const filePath = path.join(__dirname, "test.pdf");
  res.sendFile(filePath);
});

app.post("/api/signature", (req, res) => {
  const { name, pin } = req.body;

  if (pin !== PIN) {
    return res.status(401).json({ message: "Invalid PIN" });
  }

  // Signature logic

  res.status(200).json({ message: "Signature collected successfully" });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
