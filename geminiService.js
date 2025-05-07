const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getGeminiResponse(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    throw new Error("Failed to fetch Gemini response.");
  }
}

module.exports = { getGeminiResponse };
