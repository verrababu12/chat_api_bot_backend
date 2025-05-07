const express = require("express");
const { getGeminiResponse } = require("../geminiService");
const {
  saveMessageToDatabase,
  getChatHistory,
} = require("../models/ChatMessage");
const { getRelevantDocuments } = require("../models/Document");

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { userId, message } = req.body;

  const relevantDocs = await getRelevantDocuments(message);

  let prompt = `Answer the following question based on the information below.\n\n`;
  relevantDocs.forEach((doc) => {
    prompt += `Context: ${doc.content}\n`;
  });
  prompt += `Question: ${message}\nAnswer:`;

  try {
    const aiResponse = await getGeminiResponse(prompt);
    await saveMessageToDatabase(userId, "user", message);
    await saveMessageToDatabase(userId, "ai", aiResponse);
    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/history/:userId", async (req, res) => {
  try {
    const history = await getChatHistory(req.params.userId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
