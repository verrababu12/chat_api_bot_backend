const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { extractTextFromPDF } = require("../utils/extractText");
const { saveDocument } = require("../models/Document");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  let textContent = "";

  try {
    if (file.mimetype === "application/pdf") {
      textContent = await extractTextFromPDF(file.path);
    } else {
      textContent = fs.readFileSync(file.path, "utf-8");
    }

    const doc = {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
      uploadDate: new Date(),
      content: textContent,
    };

    await saveDocument(doc);
    res.json({ message: "File uploaded and processed successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
