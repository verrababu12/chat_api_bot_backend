const fs = require("fs");
const pdfParse = require("pdf-parse");

async function extractTextFromPDF(path) {
  const buffer = fs.readFileSync(path);
  const data = await pdfParse(buffer);
  return data.text;
}

module.exports = { extractTextFromPDF };
